// src/components/Header/NavMenu.jsx
import { useEffect, useRef, useState } from "react";
import "./navMenu.scss";

const NavMenu = () => {
  const [isToggled, setIsToggled] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const list = document.getElementById("mobile-menu-list");
    if (!list) return;
    list.hidden = !isToggled;
  }, [isToggled]);

  useEffect(() => {
    const list = document.getElementById("mobile-menu-list");
    if (!list) return;

    const closeOnLinkClick = (e) => {
      if (e.target.closest("a")) setIsToggled(false);
    };
    list.addEventListener("click", closeOnLinkClick);
    return () => list.removeEventListener("click", closeOnLinkClick);
  }, []);

  const handleBlur = (e) => {
    const list = document.getElementById("mobile-menu-list");
    if (list && !list.contains(e.relatedTarget) && e.relatedTarget !== buttonRef.current) {
      setIsToggled(false);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={() => setIsToggled((prev) => !prev)}
      onBlur={handleBlur}
      className={`menu-toggler ${isToggled ? "toggled" : ""}`}
      type="button"
    >
      <span />
      <span />
      <span />
    </button>
  );
};

export default NavMenu;
