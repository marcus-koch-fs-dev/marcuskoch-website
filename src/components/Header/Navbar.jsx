import { useState, useEffect } from "react";
import { navLinks } from "./navLinks";
import { NavLink, Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import useResponsiveSize from "../../hooks/useResponsiveSize";
import "./navbar.scss";

const Navbar = () => {
  const displaySize = useResponsiveSize();
  const isMobile = displaySize === "sm";
  //   const isMobile = true;
  const [isToggled, setIsToggled] = useState(false);

  const renderList = () => (
    <ul className="menu-vertical">
      {navLinks.map((link, idx) => (
        <li className="menu-item" key={idx}>
          <Link to={`/${link.to}`}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );

  const renderBar = () => (
    <ul className="menu-horizontal">
      {navLinks.map((link, idx) => (
        <li className="menu-item" key={idx}>
          <NavLink
            to={`/${link.to}`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {isMobile ? (
        <div className={`menu-wrapper-vertical`}>
          <NavMenu
            handleClick={() => setIsToggled((prev) => !prev)}
            isToggled={isToggled}
          />
          {isToggled && renderList()}
        </div>
      ) : (
        <div className="menu-wrapper-horizontal">{renderBar()}</div>
      )}
    </>
  );
};

export default Navbar;
