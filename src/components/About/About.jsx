import videobg from "../../videos/home.mp4";
const AboutUs = ({ classicHeader, darkTheme }) => {
  return (
    <section id="about" className={"section " + (darkTheme ? "bg-dark-1" : "")}>
      <div className={"container " + (classicHeader ? "" : "px-lg-5")}>
        {/* Heading */}
        <div className="position-relative d-flex text-center mb-5">
          <h2
            className={
              "text-24  text-uppercase fw-600 w-100 mb-0 " +
              (darkTheme ? "text-muted opacity-1" : "text-light opacity-4")
            }
          >
            Über Mich
          </h2>
          <p
            className={
              "text-9 text-dark fw-600 position-absolute w-100 align-self-center lh-base mb-0 " +
              (darkTheme ? "text-white" : "text-dark")
            }
          >
            Über Mich
            <span className="heading-separator-line border-bottom border-3 border-primary d-block mx-auto" />
          </p>
        </div>
        {/* Heading end*/}
        <div className="row gy-5" style={{ justifyContent: "center" }}>
          {/* About me content start */}
          <div
            className="col-lg-10  "
            // style={{
            //   alignItems: "center",
            //   display: "flex",
            //   flexDirection: "column",
            // }}
          >
            <h2
              className={
                "text-7 fw-600 mb-3 " + (darkTheme ? "text-white" : "")
              }
              style={{ wordBreak: "break-word" }}
            >
              Ich bin <span className="text-primary">Marcus Koch, </span>
              ein dynamischer JavaScript Full-Stack Entwickler, zu Hause in der
              Welt der React-Frontends.
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              <div className="col-lg-5">
                <video
                  controls
                  src={videobg}
                  muted
                  style={{
                    width: "100%",
                    height: "90%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="col-lg-6 ">
                <p className={darkTheme ? "text-white-50" : ""}>
                  Als enthusiastischer Entwickler schaffe ich Webseiten, die
                  durch Optik und intuitive Bedienbarkeit überzeugen. Mit
                  modernen Techniken und Werkzeugen wie React entwickle ich
                  schnelle, nutzerfreundliche Lösungen.
                </p>
                <p className={darkTheme ? "text-white-50" : ""}>
                  Durch agile Methoden und ständiges Feedback sorge ich für hohe
                  Qualitätsstandards und bedürfnisorientierte Ergebnisse.
                </p>
                <p className={darkTheme ? "text-white-50" : ""}>
                  Meine Expertise in der Digitalisierung, besonders im
                  Automobilsektor, qualifiziert mich für Herausforderungen über
                  Branchengrenzen hinweg. Ich hebe Ihre digitalen Produkte auf
                  das nächste Level.
                </p>
                <p className={darkTheme ? "text-white-50" : ""}>
                  <a
                    aria-label="Set appoinment"
                    // className="btn btn-outline-primary rounded-pill shadow-none smooth-scroll mt-2"
                    href="https://calendly.com/marcus-koch-webdev/30min"
                    target="_blank"
                  >
                    <span className="text-primary fw-600">
                      Bereit für den nächsten Schritt?{" "}
                    </span>
                  </a>
                  Kontaktieren Sie mich, und wir gestalten die Zukunft
                  gemeinsam.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* projects rewards counting start */}
        <div
          className={
            "brands-grid separator-border mt-5 " +
            (darkTheme ? "separator-border-light" : "")
          }
        >
          <div className="row">
            <div className="col-6 col-md-4">
              <div className="featured-box text-center">
                <h4
                  className={
                    "text-12  mb-0 " +
                    (darkTheme ? "text-white-50" : "text-muted")
                  }
                >
                  <span>3</span>+
                </h4>
                <p className={"mb-0 " + (darkTheme ? "text-light" : "")}>
                  Jahre an Expertise
                </p>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="featured-box text-center">
                <h4
                  className={
                    "text-12  mb-0 " +
                    (darkTheme ? "text-white-50" : "text-muted")
                  }
                >
                  <span>4</span>
                  {/* + */}
                </h4>
                <p className={"mb-0 " + (darkTheme ? "text-light" : "")}>
                  Zufriedene Kunden
                </p>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="featured-box text-center">
                <h4
                  className={
                    "text-12  mb-0 " +
                    (darkTheme ? "text-white-50" : "text-muted")
                  }
                >
                  <span>5</span>
                  {/* + */}
                </h4>
                <p className={"mb-0 " + (darkTheme ? "text-light" : "")}>
                  Abgeschlossene Projekte
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* projects rewards counting end */}
      </div>
    </section>
  );
};

export default AboutUs;
