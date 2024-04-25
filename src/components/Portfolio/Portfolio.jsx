import { useEffect, useRef, useState } from "react";
import Isotope from "isotope-layout";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { projectsData } from "./projectList";

const Portfolio = ({ classicHeader, darkTheme }) => {
  // init one ref to store the future isotope object
  const isotope = useRef();
  // store the filter keyword in a state
  const [imagesLoaded, setimagesLoaded] = useState(0);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState();

  // initialize an Isotope object with configs
  useEffect(() => {
    isotope.current = new Isotope(".portfolio-filter", {
      itemSelector: ".filter-item",
      layoutMode: "masonry",
    });

    // cleanup
    return () => {
      isotope.current.destroy();
    };
  }, []);

  // handling filter key change
  useEffect(() => {
    if (imagesLoaded) {
      // filterKey === "*"
      isotope.current.arrange({ filter: `*` });
      // : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [imagesLoaded]);

  return (
    <>
      <section
        id="portfolio"
        className={"section " + (darkTheme ? "bg-dark-2" : "bg-light")}
      >
        <div className={"container " + (classicHeader ? "" : "px-lg-5")}>
          {/* Heading */}
          <div className="position-relative d-flex text-center mb-5">
            <h2
              className={
                "text-24  text-uppercase fw-600 w-100 mb-0 " +
                (darkTheme ? "text-muted opacity-1" : "text-light opacity-4")
              }
            >
              Portfolio
            </h2>
            <p
              className={
                "text-9 text-dark fw-600 position-absolute w-100 align-self-center lh-base mb-0 " +
                (darkTheme ? "text-white" : "text-dark")
              }
            >
              Portfolio
              <span className="heading-separator-line border-bottom border-3 border-primary d-block mx-auto" />
            </p>
          </div>
          {/* Heading end*/}
          {/* Filter Menu end */}
          <div className="portfolio popup-ajax-gallery">
            <div className="row portfolio-filter filter-container g-4">
              {projectsData.map((project, index) => (
                <div
                  className={
                    "col-sm-6 col-lg-4 filter-item "
                    // project.categories.join(" ")
                  }
                  key={index}
                >
                  <div className="portfolio-box rounded">
                    <div className="portfolio-img rounded">
                      <img
                        onLoad={() => {
                          setimagesLoaded(imagesLoaded + 1);
                        }}
                        className="img-fluid d-block portfolio-image"
                        src={project.thumbImage}
                        alt=""
                        style={{
                          maxHeight: "25vh",
                          margin: "0 auto",
                        }}
                      />
                      <div className="portfolio-overlay">
                        <a
                          className="popup-ajax stretched-link"
                          href=""
                          onClick={() => {
                            setSelectedProjectDetails(projectsData[index]);
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        />
                        <div className="portfolio-overlay-details">
                          <h5
                            className="text-white fw-400"
                            style={{ padding: "1rem" }}
                          >
                            {project.title}
                          </h5>
                          {/* <span className="text-light">Category</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="project-details-modal">
        {/* Modal */}
        <ProjectDetailsModal
          projectDetails={selectedProjectDetails}
          darkTheme={darkTheme}
        ></ProjectDetailsModal>
      </div>
    </>
  );
};

export default Portfolio;
