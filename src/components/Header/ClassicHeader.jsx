import { useEffect, useState } from "react";
import { Link } from "react-scroll";

const ClassicHeader = () => {
  const [stickyHeader, setStickyHeader] = useState(false);
  const [isNavModalClose, setIsNavModalClose] = useState(true);

  useEffect(() => {
    const checkScrollTop = () => {
      if (window.pageYOffset > 180) {
        setStickyHeader(true);
      } else {
        setStickyHeader(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);

    // Cleanup-Funktion, um den Event Listener zu entfernen
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
          <Link
            to="home"
            className="logo"
            smooth
            duration={500}
            title="Zur Startseite"
            onClick={() => setIsNavModalClose(true)}
          >
            {/* Logo hier einfügen. Zum Beispiel: <img src="/path/to/logo.png" alt="Logo" /> */}
          </Link>
          <button
            className={`navbar-toggler ${!isNavModalClose ? "show" : ""}`}
            type="button"
            aria-controls="header-nav"
            aria-expanded={!isNavModalClose}
            onClick={() => setIsNavModalClose(!isNavModalClose)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            id="header-nav"
            className={`collapse navbar-collapse justify-content-center ${
              !isNavModalClose ? "show" : ""
            }`}
            aria-label="Hauptnavigation"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="home"
                  className="nav-link"
                  smooth
                  duration={500}
                  spy
                  activeClass="active"
                  onClick={() => setIsNavModalClose(true)}
                >
                  Startseite
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="about"
                  className="nav-link"
                  smooth
                  duration={500}
                  spy
                  activeClass="active"
                  onClick={() => setIsNavModalClose(true)}
                >
                  Über mich
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="services"
                  className="nav-link"
                  smooth
                  duration={500}
                  spy
                  activeClass="active"
                  onClick={() => setIsNavModalClose(true)}
                >
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="portfolio"
                  className="nav-link"
                  smooth
                  duration={500}
                  spy
                  activeClass="active"
                  onClick={() => setIsNavModalClose(true)}
                >
                  Portfolio
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="rezensionen"
                  className="nav-link"
                  smooth
                  duration={500}
                  spy
                  activeClass="active"
                  onClick={() => setIsNavModalClose(true)}
                >
                  Rezensionen
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default ClassicHeader;
