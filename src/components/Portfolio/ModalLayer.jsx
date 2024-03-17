import { createPortal } from "react-dom";

const ModalLayer = ({ handleClose, image, darkTheme }) => {
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={handleClose}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          border: "none",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Leicht transparentes Weiß
          color: "#333", // Dunkle Schriftfarbe für das "X"
          fontSize: "24px", // Größere Schrift für bessere Sichtbarkeit
          lineHeight: "24px", // Zeilenhöhe entsprechend der Schriftgröße anpassen
          width: "40px", // Festgelegte Breite
          height: "40px", // Festgelegte Höhe
          borderRadius: "50%", // Rundet die Ecken zu einem Kreis
          display: "flex", // Ermöglicht die Zentrierung des Inhalts mit Flexbox
          alignItems: "center", // Zentriert den Inhalt vertikal
          justifyContent: "center", // Zentriert den Inhalt horizontal
          cursor: "pointer", // Verändert den Cursor zum Klick-Symbol
          outline: "none", // Entfernt den Fokus-Rahmen
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Einfacher Schatten für Tiefe
        }}
      >
        &times; {/* Das HTML-Entity für das Multiplikationszeichen (X) */}
      </button>
      <img
        src={image}
        alt="Modal Content"
        style={{
          maxWidth: "90%",
          maxHeight: "90%",
          objectFit: "contain", // This ensures the image is fully visible and maintains aspect ratio
        }}
      />
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalLayer;
