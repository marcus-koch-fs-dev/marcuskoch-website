import Datenschutz from "./Datenschutz";
import Impressum from "./Impressum";
import IconLinkedin from "../../../public/assets/linkedin.png";
import IconGit from "../../../public/assets/git.png";
import "./footer.scss";
import InterpolatedWave from "./InterpolatedWave";

const Footer = () => {
  return (
    <footer>
      <InterpolatedWave />
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
              <p className="laws-p">Copyright ©2024 Marcus Koch</p>
            </li>
            <li className="laws-item">
              <a
                data-bs-toggle="modal"
                data-bs-target="#datenschutz"
                href="#datenschutz"
              >
                <span className={""}>Datenschutz</span>
              </a>
            </li>
            <li className="laws-item">
              <a
                data-bs-toggle="modal"
                data-bs-target="#impressum"
                href="#impressum"
              >
                <span className={""}>Impressum</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
      <Impressum darkTheme={false} />
      <Datenschutz darkTheme={false} />
    </footer>
  );
};

export default Footer;
