import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import cairoFont from "./fonts/Cairo-Regular.ttf";
import logo from "./images/logo.png";
import logo2 from "./images/logo.jpg";
import signature from "./images/signature.png";

// تسجيل الخط
Font.register({
  family: "Cairo",
  src: cairoFont,
});

// دالة لتحديد حجم الخط بناءً على طول الاسم
const getFontSizeForName = (name) => {
  if (name.length <= 15) return 26;
  if (name.length <= 22) return 20;
  return 15;
};

// تعريف الثيمات المحسنة
const themes = {
  gold: {
    mainColor: "#d4af37",
    accentColor: "#4a4a4a",
    bgColor: "#fffaf0",
    borderColor: "#d4af37",
    lightColor: "#fdf8e6",
    titleColor: "#b8860b",
    nameColor: "#8b6c00",
    watermarkOpacity: 0.2, // شفافية مخصصة للثيم الذهبي
  },
  blue: {
    mainColor: "#2a628f",
    accentColor: "#333333",
    bgColor: "#f0f8ff",
    borderColor: "#2a628f",
    lightColor: "#e6f2ff",
    titleColor: "#1e3a5f",
    nameColor: "#1c4e80",
    watermarkOpacity: 0.07, // زيادة طفيفة للوضوح في الخلفية الفاتحة
  },
  classic: {
    mainColor: "#546e7a",
    accentColor: "#3c3c3c",
    bgColor: "#ffffff",
    borderColor: "#546e7a",
    lightColor: "#f0f0f0",
    titleColor: "#3d4e5a",
    nameColor: "#2c3e50",
    watermarkOpacity: 0.06, // شفافية مناسبة للخلفية البيضاء
  },
  modern: {
    mainColor: "#5d5c61",
    accentColor: "#737373",
    bgColor: "#f8f8f8",
    borderColor: "#5d5c61",
    lightColor: "#ebebeb",
    titleColor: "#4a494d",
    nameColor: "#3a3a3d",
    watermarkOpacity: 0.08, // زيادة للوضوح في الخلفية الرمادية الفاتحة
  },
  luxury: {
    mainColor: "#8e44ad",
    accentColor: "#2c3e50",
    bgColor: "#fcf6f9",
    borderColor: "#8e44ad",
    lightColor: "#faeef4",
    titleColor: "#6c3483",
    nameColor: "#4a2d5e",
    watermarkOpacity: 0.06, // شفافية مناسبة للخلفية الوردية الفاتحة
  },
};

const CertificatePDF = ({ name, theme = "gold" }) => {
  const selectedTheme = themes[theme];
  const currentDate = new Date().toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const certificateCode = `#${Math.floor(Math.random() * 90000) + 10000}`;

  const styles = StyleSheet.create({
    page: {
      backgroundColor: selectedTheme.bgColor,
      padding: 25,
      borderWidth: 6,
      borderColor: selectedTheme.borderColor,
      borderStyle: "double",
      fontFamily: "Cairo",
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: selectedTheme.lightColor,
      opacity: 0.4,
      zIndex: -1,
    },
    // العلامة المائية في الخلفية
    logoWatermark: {
      position: "absolute",
      top: "20%",
      left: "25%",
      // استخدام الشفافية المحددة لكل ثيم
      opacity: selectedTheme.watermarkOpacity,
      width: "50%",
      height: "50%",
      objectFit: "contain",
      zIndex: -2, // تأكد أنها دائمًا في الخلفية القصوى
    },
    headerSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
      paddingBottom: 5,
      borderBottomWidth: 0.5,
      borderColor: selectedTheme.accentColor,
      opacity: 0.8,
    },
    mainLogo: {
      width: 80,
      height: 80,
      objectFit: "contain",
    },
    headerText: {
      fontSize: 13,
      textAlign: "right",
      color: selectedTheme.accentColor,
      flexGrow: 1,
      marginLeft: 10,
      fontWeight: "bold",
    },
    title: {
      fontSize: 28,
      fontWeight: "extrabold",
      marginBottom: 5,
      textAlign: "center",
      color: selectedTheme.titleColor,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    titleLine: {
      height: 2.5,
      backgroundColor: selectedTheme.mainColor,
      marginVertical: 12,
      width: "50%",
      alignSelf: "center",
      opacity: 0.8,
      borderRadius: 1,
    },
    subTitle: {
      fontSize: 16,
      textAlign: "center",
      color: selectedTheme.accentColor,
      marginBottom: 10,
      fontWeight: "medium",
    },
    description: {
      fontSize: 16,
      fontWeight: "300",
      marginHorizontal: 30,
      textAlign: "center",
      color: selectedTheme.accentColor,
      lineHeight: 1.5,
      marginBottom: 25,
    },
    name: {
      marginTop: 10,
      marginBottom: 10,
      textAlign: "center",
      color: selectedTheme.nameColor,
      fontWeight: "bold",
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderColor: selectedTheme.lightColor,
      width: "70%",
      alignSelf: "center",
    },
    signatureContainer: {
      marginTop: 25,
      alignSelf: "flex-start",
      marginLeft: 60,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: 170,
    },
    signature: {
      width: 120,
      height: 60,
      objectFit: "contain",
    },
    signerName: {
      fontSize: 13,
      color: selectedTheme.accentColor,
      fontWeight: "bold",
    },
    signerTitle: {
      fontSize: 11,
      color: selectedTheme.accentColor,
    },
    footerInfo: {
      position: "absolute",
      bottom: 20,
      left: 30,
      right: 30,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    footerText: {
      fontSize: 9,
      color: "#666",
    },
    rightCornerImage: {
      position: "absolute",
      bottom: 50,
      right: 25,
      width: 80,
      height: 80,
      opacity: 0.6,
      objectFit: "contain",
      borderRadius: 5,
    },
  });

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* طبقة تراكب خفيفة للخلفية */}
        <View style={styles.overlay} />
        {/* العلامة المائية في الخلفية */}
        <Image src={logo} style={styles.logoWatermark} />
        {/* قسم الرأس - الشعار على اليسار والنص على اليمين */}
        <View style={styles.headerSection}>
          <Image src={logo2} style={styles.mainLogo} />
          <Text style={styles.headerText}>
            National Center for Spatial Information Infrastructure
          </Text>
        </View>
        {/* العنوان الرئيسي */}
        <Text style={styles.title}>CERTIFICATE OF ACHIEVEMENT</Text>
        <View style={styles.titleLine} /> {/* الخط الفاصل تحت العنوان */}
        <Text style={styles.subTitle}>تُمنح هذه الشهادة لـ</Text>
        {/* اسم الحاضر */}
        <Text
          style={{
            ...styles.name,
            fontSize: getFontSizeForName(name),
          }}
        >
          {name}
        </Text>
        {/* الوصف */}
        <Text style={styles.description}>
          تقديراً لمشاركته الناجحة وإتمامه دورة **تطوير واجهات المستخدم** بنجاح،
          ونتمنى له دوام التوفيق والنجاح في مسيرته المهنية.
        </Text>
        {/* قسم التوقيع على اليسار */}
        <View style={styles.signatureContainer}>
          <Text style={styles.signerName}>Eng. Ahmed Hesham</Text>
          <Image src={signature} style={styles.signature} />
          <Text style={styles.signerTitle}>
            Technology Development Consultant
          </Text>
        </View>
        {/* معلومات الذيل (التاريخ ورقم الشهادة) */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>تاريخ الإصدار: {currentDate}</Text>
          <Text style={styles.footerText}>رقم الشهادة: {certificateCode}</Text>
        </View>
        {/* الصورة في الزاوية اليمنى السفلية */}
        <Image src={logo} style={styles.rightCornerImage} />
      </Page>
    </Document>
  );
};

export default CertificatePDF;
