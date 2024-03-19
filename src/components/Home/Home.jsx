import videobg from "../../videos/home.mp4";

const Home = ({ darkTheme, handleNavClick }) => {
  return (
    <section id="home">
      <div className="hero-wrap">
        <div className="hero-mask opacity-8 bg-dark"></div>

        {/* ---------------image background------------------ */}
        <div
          className="hero-bg parallax"
          style={{
            backgroundImage: 'url("/assets/tech-tokio.jpg")',
          }}
        ></div>

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
                <p className="text-9 fw-500 text-white mb-2 mb-md-2">
                  Willkommen
                </p>
                <h2 className="text-14 fw-600 text-white mb-2 mb-md-3">
                  <span>Hi, ich bin Marcus Koch,</span>
                  <span>Fullstack-Developer and Frontend-Virtuose</span>
                </h2>
                <a
                  aria-label="Kontakt für Gratis Beratung sichern"
                  className="btn btn-outline-primary rounded-pill shadow-none smooth-scroll mt-2"
                  href="https://calendly.com/marcus-koch-webdev/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jetzt Gratis Beratung Sichern
                </a>
              </div>
            </div>
          </div>
          <a
            href="#about"
            aria-label="Zur Über-mich Sektion"
            className="scroll-down-arrow text-white"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("about");
            }}
          >
            <span className="animated">
              <i className="fa fa-chevron-down"></i>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
