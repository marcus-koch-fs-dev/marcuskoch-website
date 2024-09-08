import { useState, useEffect } from "react";
import { navLinks } from "./navLinks";
import { NavLink, Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import useResponsiveSize from "../../hooks/useResponsiveSize";
import "./navbar.scss";
import { useRef } from "react";
import ThemesToggler from "../ThemesToggler/ThemesToggler";

const Navbar = () => {
  const { isMobile } = useResponsiveSize();
  const [isToggled, setIsToggled] = useState(false);
  const menuRef = useRef(null);

  const renderList = () => (
    <ul className="menu-vertical" ref={menuRef}>
      {navLinks.map((link, idx) => (
        <li className="menu-item" key={idx} onClick={() => setIsToggled(false)}>
          <Link to={`/${link.to}`}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );

  const renderBar = () => (
    <>
      {/* <ThemesToggler /> */}
      <ul className="menu-horizontal">
        {navLinks.map((link, idx) => (
          <li className="menu-item" key={idx}>
            <NavLink
              to={`/${link.to}`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span>{link.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <>
      {isMobile ? (
        <div className={`menu-wrapper-vertical`}>
          <div className="themesToggler">
            <ThemesToggler />
          </div>
          <NavMenu
            menuRef={menuRef}
            handleClick={() => setIsToggled((prev) => !prev)}
            isToggled={isToggled}
          />
          {isToggled && renderList()}
        </div>
      ) : (
        <div className="menu-wrapper-horizontal">
          <div className="themesToggler">
            <ThemesToggler />
          </div>
          {renderBar()}
          <div className="placeholder"></div>
        </div>
      )}
    </>
  );
};

export default Navbar;
