import { createPortal } from "react-dom";
import "./overlay.scss";

export const Overlay = ({ children, handleClose }) => {
  return createPortal(
    <div className="overlay">
      <div className="control">
        <button onClick={handleClose} className="overlay-close">
          <i type="button" className="fa-solid fa-xmark" />
        </button>
      </div>
      <div className="children">{children}</div>
    </div>,
    document.getElementById("modal-root")
  );
};
