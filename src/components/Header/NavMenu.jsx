import React from "react";
import "./navMenu.scss";

const NavMenu = ({ handleClick, isToggled }) => {
  return (
    <button
      onClick={() => handleClick(!isToggled)}
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
