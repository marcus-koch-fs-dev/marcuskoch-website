import React from "react";
import resumeFile from "../../documents/resume.pdf";

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
          <div className="col-lg-7 col-xl-8 text-center text-lg-start">
            <h2
              className={
                "text-7 fw-600 mb-3 " + (darkTheme ? "text-white" : "")
              }
            >
              Ich bin <span className="text-primary">Marcus Koch, </span>
              JavaScript Full-Stack Entwickler und mein Schwerpunkt ist das
              bauen von Frontends mit React.
            </h2>
            <p className={darkTheme ? "text-white-50" : ""}>
              Als enthusiastischer Entwickler konzentriere ich mich darauf,
              ansprechende Webseiten zu erstellen, die sowohl durch ihre Optik
              als auch durch intuitive Bedienbarkeit überzeugen. Mein Ziel ist
              es, dem Nutzer ein positives Erlebnis zu schaffen, das er mit
              Ihrem Produkt verbindet.
            </p>
            <p className={darkTheme ? "text-white-50" : ""}>
              Weil ich überzeugt bin, dass technische Exzellenz und ein
              herausragendes Nutzererlebnis Hand in Hand gehen sollten. Als
              Full-Stack Entwickler mit einem Schwerpunkt auf React im Frontend
              lege ich großen Wert auf eine optimale Datenbereitstellung und
              eine reibungslose Bedienbarkeit.
            </p>
            <p className={darkTheme ? "text-white-50" : ""}>
              Mit meinem tiefgreifenden Verständnis für React und
              unterstützenden Tools wie Redux und TypeScript garantiere ich hohe
              Performance und Benutzerfreundlichkeit. Agile Entwicklungsmethoden
              und regelmäßige Code-Reviews unterstützen mich dabei, Qualität und
              Flexibilität meiner Projekte zu sichern, ergänzt durch eine
              nahtlose Backend-Integration über Microservices und REST-APIs.
            </p>
            <p className={darkTheme ? "text-white-50" : ""}>
              Meine bisherige Expertise liegt vor allem bei der Digitalisierung
              interner Prozesse im Automobilsektor. Darüber hinaus bin ich auch
              offen für Herausforderungen in anderen Branchen. Ich biete
              Frontend-Entwicklung, die Ihre digitalen Produkte auf das nächste
              Level heben.
            </p>
            <p className={darkTheme ? "text-white-50" : ""}>
              Lassen Sie uns gemeinsam innovative Lösungen schaffen, die nicht
              nur technisch überzeugen, sondern auch Ihre Nutzer begeistern.
            </p>
          </div>
          {/* About me content end */}
          {/* about me personal detials start */}
          {/* <div className="col-lg-5 col-xl-4">block</div> */}
          {/* about me personal details end */}
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
            {/* <div className="col-6 col-md-4">
              <div className="featured-box text-center">
                <h4
                  className={
                    "text-12  mb-0 " +
                    (darkTheme ? "text-white-50" : "text-muted")
                  }
                >
                  <span>38</span>
                </h4>
                <p className={"mb-0 " + (darkTheme ? "text-light" : "")}>
                  Get Awards
                </p>
              </div>
            </div> */}
          </div>
        </div>
        {/* projects rewards counting end */}
      </div>
    </section>
  );
};

export default AboutUs;

// {/* <div className="ps-lg-4">
// <ul
//   className={
//     "list-style-2 " +
//     (darkTheme ? "list-style-light text-light" : "")
//   }
// >
//   <li>
//     <span className="fw-600 me-2">Name:</span>Marcus Koch
//   </li>
//   <li>
//     <span className="fw-600 me-2">Email:</span>
//     <a href="mailto:chat@simone.com">info@marcuskochtech.com</a>
//   </li>
//   {/* <li>
//     <span className="fw-600 me-2">Age:</span>28
//   </li> */}
//   <li className="border-0">
//     <span className="fw-600 me-2">From:</span>Lindau am Bodensee,
//     Deutschland
//   </li>
// </ul>
// <a
//   href={resumeFile}
//   download
//   className="btn btn-primary rounded-pill"
// >
//   Download CV
// </a>
// </div> */}
