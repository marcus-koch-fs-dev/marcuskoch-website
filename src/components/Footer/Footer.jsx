import Datenschutz from "./Datenschutz";
import Impressum from "./Impressum";
import IconLinkedin from "/assets/linkedin.png";
import IconGit from "/assets/git.png";
import "./footer.scss";
import InterpolatedWave from "./InterpolatedWave";
import useResponsiveSize from "../../hooks/useResponsiveSize";
import { useNavigate, useLocation } from "react-router-dom";
import { navLinks } from "../Header/navLinks";
import { Overlay } from "../Overlay";
import { useState } from "react";

const Footer = () => {
  const [openDS, setOpenDS] = useState(false);
  const [openImp, setOpenImp] = useState(false);
  const { width } = useResponsiveSize();
  const navigate = useNavigate();
  let location = useLocation();
  const routes = navLinks.reduce((obj, nav, idx) => {
    return { ...obj, [nav.to]: idx };
  }, {});

  const handleClick = () => {
    const curPath = location.pathname.slice(1);
    const getIdx = routes[curPath];
    const nextIndex = (getIdx + 1) % navLinks.length;
    navigate(navLinks[nextIndex].to);
  };

  return (
    <footer>
      <a
        aria-label="Nächste Seite"
        role="button"
        className="next-page-btn"
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <i className="fa fa-chevron-down" />
      </a>
      <InterpolatedWave innerW={width} />
      <div className="wrapper">
        <section className="sm-wrapper">
          <ul className="sm-list">
            <li className="sm-item">
              <a
                href="https://www.linkedin.com/in/marcus-koch-webdeveloper "
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="sm-icon" src={IconLinkedin} alt="Linkedin" />
              </a>
            </li>
            <li className="item">
              <a
                href="https://github.com/marcus-koch-fs-dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="icon" src={IconGit} alt="Github" />
              </a>
            </li>
          </ul>
        </section>
        <section className="laws">
          <ul className="laws-list">
            <li className="laws-item">
              <span className="">Copyright ©2024 Marcus Koch</span>
            </li>
            <li className="laws-item" onClick={() => setOpenDS(true)}>
              <span className={"laws-p"}>Datenschutz</span>
            </li>
            <li className="laws-item" onClick={() => setOpenImp(true)}>
              <span className={"laws-p"}>Impressum</span>
            </li>
          </ul>
        </section>
      </div>
      {openDS && (
        <Overlay handleClose={() => setOpenDS(false)}>
          <Datenschutz />
        </Overlay>
      )}
      {openImp && (
        <Overlay handleClose={() => setOpenImp(false)}>
          <Impressum />
        </Overlay>
      )}
    </footer>
  );
};

export default Footer;
