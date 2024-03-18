import Typewriter from "typewriter-effect";
// import videobg from "../../videos/home.mp4";

const Home = ({ classicHeader, darkTheme, handleNavClick }) => {
  return (
    <section id="home" href="/home">
      <div className="hero-wrap">
        <div className="hero-mask opacity-8 bg-dark" />

        {/* ---------------image background------------------ */}
        <div
          className="hero-bg parallax"
          style={{
            backgroundImage: 'url("/assets/arts/Ningbo/Enjoy.JPG")',
          }}
        ></div>

        {/* -------------------video background---------------------- */}

        {/* <div className="player hero-bg parallax">
          <video
            src={videobg}
            autoPlay
            muted
            loop
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          ></video>
        </div> */}

        <div className="hero-content section d-flex min-vh-100">
          <div className="container my-auto">
            <div className="row">
              <div className="col-12 text-center">
                <p className="text-7 fw-500 text-white mb-2 mb-md-3">
                  Willkommen
                </p>
                <h2 className="text-14 fw-600 text-white mb-2 mb-md-3 ">
                  <Typewriter
                    options={{
                      strings: [
                        "Hi, ich bin Marcus Koch...",
                        "Fullstack-Developer and Frontend-Virtuose.",
                        "Außerdem, Hobbyfotograf & Freediving-Fan",
                        "Ich möchte Technik und Kreativität vereinen.",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 40,
                    }}
                  />
                </h2>
                <a
                  href="#contact"
                  aria-label="go to contact section"
                  className="btn btn-outline-primary rounded-pill shadow-none smooth-scroll mt-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("contact");
                  }}
                >
                  Jetzt Kontaktieren
                </a>
              </div>
            </div>
          </div>
          <a
            href="#about"
            aria-label="go to about section"
            className="scroll-down-arrow text-white smooth-scroll"
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
