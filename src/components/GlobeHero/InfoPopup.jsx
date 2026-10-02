export default function InfoPopup({ className = "", onClose, onCloseHover, closeLabel = "Close", children }) {
  return (
    <div className={`globe-hero__info-popup${className ? ` ${className}` : ""}`}>
      <button
        type="button"
        className="globe-hero__info-popup-close"
        onClick={onClose}
        onMouseEnter={onCloseHover}
        aria-label={closeLabel}
      >
        &times;
      </button>
      {children}
    </div>
  );
}
