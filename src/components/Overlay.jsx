import { createPortal } from "react-dom";
import "./overlay.scss";

export const Overlay = ({ children, handleClose }) => {
  return createPortal(
    <div className="overlay">
      <div className="control">
        <button onClick={handleClose} className="overlay-close">
          <i className="fa-solid fa-xmark i-tag" />
        </button>
      </div>
      <div className="children">{children}</div>
    </div>,
    document.getElementById("modal-root")
  );
};
