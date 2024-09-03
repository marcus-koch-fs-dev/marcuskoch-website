import React from "react";
import "./navMenu.scss";
import { useEffect } from "react";

const NavMenu = ({ handleClick, isToggled, menuRef }) => {
  const handleBlur = (e) => {
    // Überprüfe, ob `menuRef` definiert ist und ob der Klick außerhalb des Menüs stattgefunden hat
    if (menuRef?.current && !menuRef.current.contains(e.relatedTarget)) {
      handleClick(false);
    }
  };

  useEffect(() => {
    if (!menuRef?.current) return;

    const menu = menuRef.current;

    // Event-Listener für Mouse-Events hinzufügen
    const handleMouseEnter = () => {
      menu.dataset.mouseHasEntered = "true";
    };

    const handleMouseLeave = () => {
      menu.dataset.mouseHasEntered = "false";
    };

    menu.addEventListener("mouseenter", handleMouseEnter);
    menu.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      // Event-Listener beim Cleanup entfernen
      menu.removeEventListener("mouseenter", handleMouseEnter);
      menu.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [menuRef]);

  return (
    <button
      onClick={() => handleClick(!isToggled)}
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
