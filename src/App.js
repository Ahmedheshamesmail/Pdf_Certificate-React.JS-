import React, { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import CertificatePDF from "./CertificatePDF";

const App = () => {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("gold");
  const [showPreview, setShowPreview] = useState(false);

  const styles = {
    container: {
      padding: "50px",
      maxWidth: "1200px",
      margin: "50px auto",
      fontFamily: "'Inter', sans-serif",
      backgroundColor: "#f5f5f5", // Lighter background
      borderRadius: "10px", // Less rounded
      display: "flex",
      gap: "30px",
      flexWrap: "wrap",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Simple shadow
      border: "1px solid #ddd", // Subtle border
    },
    columnLeft: {
      flex: "0 0 30%",
      minWidth: "300px",
      display: "flex",
      flexDirection: "column",
    },
    columnRight: {
      flex: "0 0 65%",
      minWidth: "300px",
      display: "flex",
      flexDirection: "column",
    },

    heading: {
      fontSize: "2em",
      color: "#333", // Darker text for contrast
      marginBottom: "30px",
      fontWeight: 700,
      letterSpacing: "1px",
      textTransform: "uppercase",
      textAlign: "center",
    },
    inputGroup: {
      marginBottom: "30px",
    },
    label: {
      fontSize: "1.1em",
      color: "#555",
      marginBottom: "10px",
      display: "block",
      fontWeight: 600,
    },
    input: {
      padding: "15px 20px",
      width: "90%",
      fontSize: "1em",
      border: "1px solid #ddd", // Solid border
      borderRadius: "8px", // Less rounded
      outline: "none",
      backgroundColor: "#fff", // White background
      color: "#333",
      transition: "all 0.3s ease",
    },
    select: {
      padding: "15px 20px",
      width: "100%",
      fontSize: "1em",
      border: "1px solid #ddd", // Solid border
      borderRadius: "8px", // Less rounded
      outline: "none",
      // Removed boxShadow for a flat look
      backgroundColor: "#fff", // White background
      color: "#333",
      transition: "all 0.3s ease",
      appearance: "none",
    },
    button: {
      padding: "15px 40px",
      backgroundColor: "#007bff", // Standard blue button
      color: "#fff", // White text
      borderRadius: "8px", // Less rounded
      fontWeight: "bold",
      fontSize: "1em",
      cursor: "pointer",
      border: "none",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Simple shadow for depth
      transition: "background-color 0.3s ease, box-shadow 0.3s ease",
      textTransform: "uppercase",
      outline: "none",
      marginTop: "20px",
      "&:hover": {
        backgroundColor: "#0056b3", // Darker blue on hover
      },
    },
    pdfViewer: {
      width: "100%",
      height: "700px",
      borderRadius: "10px", // Less rounded
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Simple shadow
      overflow: "hidden",
      border: "1px solid #ddd", // Add a subtle border
    },
  };

  return (
    <div style={styles.container}>
      {/* Left Column */}
      <div style={styles.columnLeft}>
        <h2 style={styles.heading}>Generate Certificate</h2>

        <div style={styles.inputGroup}>
          <label htmlFor="name-input" style={styles.label}>
            Enter Recipient's Name:
          </label>
          <input
            id="name-input"
            type="text"
            placeholder="e.g., John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
            autoFocus
            autoComplete="off"
            pattern="^[a-zA-Z\s]+$"
            title="Please enter a valid name (letters and spaces only)"
            maxLength="150"
            minLength="3"
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="theme-select" style={styles.label}>
            Select Theme:
          </label>
          <select
            id="theme-select"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={styles.select}
          >
            <option value="gold">Gold Elegant</option>
            <option value="blue">Classic Blue</option>
            <option value="classic">Minimalist</option>
            <option value="modern">Modern</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>

        <button onClick={() => setShowPreview(true)} style={styles.button}>
          Show Preview
        </button>

        {showPreview && (
          <PDFDownloadLink
            document={<CertificatePDF name={name} theme={theme} />}
            fileName={`Certificate - ${name}.pdf`}
            style={{
              ...styles.button,
              marginTop: "20px",
              textDecoration: "none",
              textAlign: "center",
            }} // Added textDecoration and textAlign for link button
          >
            {({ loading }) =>
              loading ? "Loading document..." : "Download Certificate"
            }
          </PDFDownloadLink>
        )}
      </div>

      {/* Right Column */}
      <div style={styles.columnRight}>
        {showPreview ? (
          <PDFViewer style={styles.pdfViewer}>
            <CertificatePDF name={name} theme={theme} />
          </PDFViewer>
        ) : (
          <div
            style={{
              ...styles.pdfViewer,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#7e8d9c",
              fontSize: "1.2em",
            }}
          >
            Preview will appear here
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
