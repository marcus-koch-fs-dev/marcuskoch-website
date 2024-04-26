import { useEffect, useState } from "react";
import { Link, scroller } from "react-scroll";
import { navLinks } from "./navLinks";

const Header = () => {
  const [stickyHeader, setStickyHeader] = useState(false);
  const [isNavModalClose, setIsNavModalClose] = useState(true);

  useEffect(() => {
    const checkScrollTop = () => {
      setStickyHeader(window.scrollY > 180);
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

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
            <ul className="navbar-nav">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.to}>
                  <Link
                    tabIndex={0}
                    aria-label={link.label}
                    to={link.to}
                    className="nav-link"
                    smooth
                    duration={500}
                    spy
                    activeClass="active"
                    onClick={() => setIsNavModalClose(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setIsNavModalClose(true);
                        scroller.scrollTo(link.to, {
                          smooth: true,
                          duration: 500,
                          spy: true,
                        });
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
