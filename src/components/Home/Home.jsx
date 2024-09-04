import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import BookingButton from "../BookingButton";
import useResponsiveSize from "../../hooks/useResponsiveSize";
import "./home.scss";
import Frame from "./Frame";
import Foto from "../../assets/me.jpg";

const Home = ({ handleNavClick }) => {
  // const { darkTheme, setTheme } = useContext(ThemeContext);
  const { width } = useResponsiveSize();

  return (
    <section className="home">
      <div className="frame">
        <div className="frame-order">
          <Frame
            width={width < 426 ? 200 : 300}
            height={width < 426 ? 200 : 300}
          />
          <img
            className="frame-img"
            alt="Foto von Marcus"
            src={Foto}
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
    </section>
  );
};

export default Home;
