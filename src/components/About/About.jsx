import Eyes from "./Eyes";
import "./about.scss";

const achievements = [
  {
    value: "3+",
    label: "Jahre in Expertise",
  },
  {
    value: "3",
    label: "Zufriedene Kunden",
  },
  {
    value: "5",
    label: "Abgeschlossene Projekte",
  },
];

const About = () => {
  const achievementList = achievements.map((ach, idx) => {
    return (
      <li
        key={idx}
        className="achievement-item"
        aria-label={`${ach.label} ${ach.value}`}
      >
        <h3 className="">
          {/* <span className="highlight-text">{ach.value}</span> */}
          {ach.value}
        </h3>
        <p className="">{ach.label}</p>
      </li>
    );
  });

  return (
    <section className="about">
      <Eyes />
      <div className="about-container">
        <h2 className="about-headline">
          Ich bin <span className="highlight-text">Marcus Koch, </span>
          kreativer Web Entwickler mit einem ausgeprägten Sinn für Qualität,
          Lösungsorientierung und einer praxisorientierten Einstellung.
        </h2>
        <article>
          <p className="">
            Als enthusiastischer Entwickler schaffe ich Webseiten, die durch
            Optik und intuitive Bedienbarkeit überzeugen. Mit modernen Techniken
            und Werkzeugen wie React entwickle ich schnelle, nutzerfreundliche
            Lösungen.
          </p>
          <p className="">
            Durch agile Methoden und ständiges Feedback sorge ich für hohe
            Qualitätsstandards und bedürfnisorientierte Ergebnisse.
          </p>
          <p className="">
            Meine Expertise in der Digitalisierung, besonders im
            Automobilsektor, qualifiziert mich für Herausforderungen über
            Branchengrenzen hinweg. Ich hebe Ihre digitalen Produkte auf das
            nächste Level.
          </p>
          <p className="">
            <span className="highlight-text">
              {`Bereit für den nächsten Schritt? `}
            </span>
            Kontaktieren Sie mich, und wir gestalten die Zukunft gemeinsam.
          </p>
        </article>

        <ul className="achievement-list">{achievementList}</ul>
      </div>
    </section>
  );
};

export default About;

{
  /* <div className="col-lg-5">
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
                  <track
                    label="Deutsch"
                    kind="subtitles"
                    srclang="de"
                    src="captions/vtt/sintel-de.vtt"
                  />
                </video>
              </div> */
}
