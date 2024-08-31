import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import videobg from "../../videos/home.mp4";
import BookingButton from "../BookingButton";
import useResponsiveSize from "../../hooks/useResponsiveSize";
const sizeObj = {
  sm: "sm",
  md: "md",
  lg: "lg",
};
// import "../../sass/_elements.scss";

const Home = ({ handleNavClick }) => {
  // const { darkTheme, setTheme } = useContext(ThemeContext);
  const curSize = useResponsiveSize();
  return (
    <section id="home">
      <div className="hero-wrap">
        {/* <div className={`hero-mask opacity-8 bg-${darkTheme ? "dark" : ""}`} /> */}

        {/* ---------------image background------------------ */}
        <div
          // className="hero-bg parallax"
          className="hero-bg"
          style={{
            // backgroundImage: `url("/assets/tech-tokio${sizeObj.sm}.jpg")`,
            // backgroundImage: `url("/assets/tech-tokio_sm.jpg")`,
            backgroundImage: `url("/assets/tech-tokio_${sizeObj[curSize]}.jpg")`,
            // backgroundPosition: "center center",
            // WebkitBackgroundPosition: "center center",
            // backgroundRepeat: "no-repeat",
            // WebkitBackgroundRepeat: "no-repeat",
            // backgroundSize: "cover",
            // WebkitBackgroundSize: "cover",
          }}
        />

        {/* -------------------video background---------------------- */}
        {/* 
        <div className="player hero-bg parallax">
          <video
            src={videobg}
            autoPlay
            muted
            loop
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          ></video>
        </div>
        */}

        <div className="hero-content section d-flex min-vh-100">
          <div className="container my-auto">
            <div className="row">
              <div className="col-12 text-center">
                <h2 className="text-14 fw-600 text-white mb-2 mb-md-3">
                  {/* <span className="text-9 fw-500 text-white mb-2 mb-md-2">
                    Willkommen
                  </span> */}
                  <span>{`Willkommen, ich bin Marcus Koch. `}</span>
                  <p />
                  <span>Web-Developer and Frontend-Virtuose</span>
                </h2>
                {/* <BookingButton /> */}
              </div>
            </div>
          </div>
          <a
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
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
