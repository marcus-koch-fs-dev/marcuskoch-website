import { useState } from "react";
import { navLinks } from "./navLinks";
import { NavLink, Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import useResponsiveSize from "../../hooks/useResponsiveSize";
import "./navbar.scss";
import ThemesToggler from "../ThemesToggler/ThemesToggler";

const Navbar = () => {
  const { isMobile } = useResponsiveSize();
  const [isToggled, setIsToggled] = useState(false);

  const renderList = () => (
    <ul className="menu-vertical">
      {navLinks.map((link, idx) => (
        <li className="menu-item" key={idx} onClick={() => setIsToggled(false)}>
          <Link to={`/${link.to}`}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );

  const renderBar = () => (
    <>
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
    <div className="menu-wrapper">
      {isMobile ? (
        <>
          <div className="themesToggler">
            <ThemesToggler />
          </div>
          <div className="placeholder"></div>
          <NavMenu
            handleClick={() => setIsToggled((prev) => !prev)}
            isToggled={isToggled}
          />
          {isToggled && renderList()}
        </>
      ) : (
        <>
          <div className="themesToggler">
            <ThemesToggler />
          </div>
          {renderBar()}
          <div className="placeholder"></div>
        </>
      )}
    </div>
  );
};

export default Navbar;
