import videobg from "../../videos/Selbstvorstellung.mp4";
import BookingButton from "../BookingButton";
import HeadlineWrapperH2 from "../Header/HeadlineWrapperH2";
const AboutUs = ({ classicHeader, darkTheme }) => {
  return (
    <section id="about" className={"section " + (darkTheme ? "bg-dark-1" : "")}>
      <div className={"container " + (classicHeader ? "" : "px-lg-5")}>
        <HeadlineWrapperH2 label={"Über Mich"} darkTheme={darkTheme} />
        <div className="row gy-5" style={{ justifyContent: "center" }}>
          {/* About me content start */}
          <div className="col-lg-10  ">
            <h3
              className={
                "text-7 fw-600 mb-3 " + (darkTheme ? "text-white" : "")
              }
              style={{ wordBreak: "break-word" }}
            >
              Ich bin <span className="text-primary">Marcus Koch, </span>
              ein dynamischer Web Entwickler und zu Hause in der Welt der
              React-Frontends.
            </h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              <div className="col-lg-5">
                <video
                  aria-label="Video mit der Selbstdarstellung von Marcus Koch"
                  controls
                  src={videobg}
                  muted
                  style={{
                    width: "100%",
                    height: "90%",
                    objectFit: "cover",
                  }}
                >
                  {/* <track
                    label="Deutsch"
                    kind="subtitles"
                    srclang="de"
                    // src="captions/vtt/sintel-de.vtt"
                  /> */}
                </video>
              </div>
              <article className="col-lg-6 ">
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
                  <span className="text-primary fw-600">
                    Bereit für den nächsten Schritt?
                  </span>
                  Kontaktieren Sie mich, und wir gestalten die Zukunft
                  gemeinsam.
                </p>
              </article>
              <BookingButton />
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
          <section className="row">
            <div className="col-6 col-md-4">
              <div
                className="featured-box text-center"
                aria-label="Jahre an Expertise 3+"
              >
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
              <div
                className="featured-box text-center"
                aria-label="Zufriedene Kunden 4"
              >
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
              <div
                className="featured-box text-center"
                aria-label="Abgeschlossene Projekte 5"
              >
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
          </section>
        </div>
        {/* projects rewards counting end */}
      </div>
    </section>
  );
};

export default AboutUs;
