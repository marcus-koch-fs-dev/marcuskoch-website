import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import videobg from "../../videos/home.mp4";
import BookingButton from "../BookingButton";
import useResponsiveSize from "../../hooks/useResponsiveSize";
import "./home.scss";
import Frame from "./Frame";

const Home = ({ handleNavClick }) => {
  // const { darkTheme, setTheme } = useContext(ThemeContext);
  // const curSize = useResponsiveSize();
  return (
    <section className="home">
      <div className="frame">
        <div className="frame-order">
          <Frame width={300} height={300} />
          <img
            className="frame-img"
            alt="Foto von Marcus"
            src="../../../public/assets/me.jpg"
            // width={"300px"}
          />
        </div>
      </div>
      <div className="homeWrapper">
        <h1 className="home-h1">
          <span>
            Hi, I'm <span className="highlight-text">Marcus</span>
          </span>
          <span>Web Developer</span>
        </h1>
        <BookingButton />
      </div>
      {/* <a
            href="#about"
            aria-label="Zur Über-Mich Sektion"
            role="button"
            className="scroll-down-arrow text-white"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("about");
            }}
          >
            <span className="animated">
              <i className="fa fa-chevron-down" />
            </span>
          </a> */}
    </section>
  );
};

export default Home;
