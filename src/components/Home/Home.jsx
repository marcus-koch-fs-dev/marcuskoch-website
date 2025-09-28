import BookingButton from "../BookingButton";
import useResponsiveSize from "../../hooks/useResponsiveSize";
import "./home.scss";
import Frame from "./Frame";
import Foto from "/assets/me.jpg";

const Home = ({ handleNavClick }) => {
  const { width } = useResponsiveSize();
  const interests = [
    "Full-Stack Developer",
    "E-Commerce Enthusiast",
    "IoT Explorer",
  ];

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
            alt="Photo Marcus"
            src={Foto}
            // width={"300px"}
          />
        </div>
      </div>
      <div className="homeWrapper">
        <h1 className="home-h1">
          Building
          <span className="highlight-text">{` Digital`}</span>
          <span className="highlight-text">{` Products `}</span>
          that create real-world impact
        </h1>
        <ul className="interests-ul">
          {interests.map((el, idx) => (
            <li key={idx} className="interests-li">
              <p>{el}</p>
            </li>
          ))}
        </ul>
        <BookingButton />
      </div>
    </section>
  );
};

export default Home;
