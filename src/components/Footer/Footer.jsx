import Datenschutz from "./Datenschutz";
import Impressum from "./Impressum";

const Footer = ({ classicHeader, darkTheme }) => {
  return (
    <footer id="footer" className={"section " + (darkTheme ? "bg-dark-1" : "")}>
      <div className={"container " + (classicHeader ? "" : "px-lg-5")}>
        <div className="row">
          <div className="col-lg-6 text-center text-lg-start">
            <p className={`mb-3 mb-lg-0 ${darkTheme ? "text-white-50" : ""} `}>
              Copyright ©2024 Marcus Koch. Alle Rechte Vorbehalten.
            </p>
          </div>
          <div className="col-lg-6">
            <ul className="nav nav-separator justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="modal"
                  data-bs-target="#datenschutz"
                  href="#datenschutz"
                >
                  <span className={darkTheme ? "text-white-50" : ""}>
                    Datenschutz
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="modal"
                  data-bs-target="#impressum"
                  href="#impressum"
                >
                  <span className={darkTheme ? "text-white-50" : ""}>
                    Impressum
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Impressum darkTheme={darkTheme} />
      <Datenschutz darkTheme={darkTheme} />
    </footer>
  );
};

export default Footer;
