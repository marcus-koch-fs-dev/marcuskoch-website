import { useEffect, useState, useMemo, useContext } from "react";
import { Link, scroller } from "react-scroll";
import { navLinks } from "./navLinks";
import { ThemeContext } from "../../context/themeContext";
import "./header.scss";

const Header = () => {
  const [stickyHeader, setStickyHeader] = useState(false);
  const [isNavModalClose, setIsNavModalClose] = useState(true);
  const { darkTheme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    // Check scroll position to toggle sticky header
    const checkScrollTop = () => {
      setStickyHeader(window.scrollY > 180);
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  useEffect(() => {
    // Ensure the window scrolls to the top on initial load
    scroller.scrollTo("home", {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: -50, // Adjust according to your needs for correct positioning
    });
  }, []);

  const navList = useMemo(
    () =>
      navLinks.map((link) => (
        <li className="nav-item" key={link.to}>
          <Link
            tabIndex={0}
            aria-label={link.label}
            to={link.to}
            className="nav-link"
            smooth
            duration={500}
            spy
            onClick={() => {
              setIsNavModalClose(true);
              scroller.scrollTo(link.to, {
                duration: 500,
                delay: 0,
                smooth: "easeInOutQuart",
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsNavModalClose(true);
                scroller.scrollTo(link.to, {
                  duration: 500,
                  delay: 0,
                  smooth: "easeInOutQuart",
                });
              }
            }}
          >
            {link.name}
          </Link>
        </li>
      )),
    []
  );

  return (
    <header className={`sticky-top-slide ${stickyHeader ? "sticky-on" : ""}`}>
      <nav
        className={`primary-menu navbar navbar-expand-lg navbar-dark bg-transparent border-bottom-0 sticky-top ${
          stickyHeader ? "sticky-on" : ""
        }`}
      >
        <div className="container-fluid position-relative">
          <div
            id="header-nav"
            className={`collapse navbar-collapse justify-content-center ${
              !isNavModalClose ? "show" : ""
            }`}
            aria-label="Hauptnavigation"
          >
            <ul className="navbar-nav">{navList}</ul>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={darkTheme}
                onChange={() => setTheme(!darkTheme)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
