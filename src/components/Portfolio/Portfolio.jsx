import { useEffect, useRef, useState } from "react";
import Isotope from "isotope-layout";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { projectsData } from "./projectList";
import HeadlineWrapperH2 from "../Header/HeadlineWrapperH2";
import { useMemo } from "react";

const Portfolio = ({ classicHeader, darkTheme }) => {
  const isotope = useRef(null);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState();

  useEffect(() => {
    isotope.current = new Isotope(".portfolio-filter", {
      itemSelector: ".filter-item",
      layoutMode: "masonry",
    });

    return () => isotope.current.destroy();
  }, []);

  useEffect(() => {
    if (allImagesLoaded) {
      isotope.current.arrange({ filter: "*" });
    }
  }, [allImagesLoaded]);

  const handleImageLoaded = () => {
    // Check if all images are loaded
    if (
      document.querySelectorAll(".portfolio-image").length ===
      projectsData.length
    ) {
      setAllImagesLoaded(true);
    }
  };

  const handleClick = (project, event) => {
    event.preventDefault(); // Verhindert Standardverhalten von Links
    setSelectedProjectDetails(project);
  };

  const prjList = useMemo(
    () =>
      projectsData.map((project, index) => (
        <div
          className="col-sm-6 col-lg-4 filter-item"
          key={index}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSelectedProjectDetails(project);
            }
          }}
        >
          <div className="portfolio-box rounded">
            <div className="portfolio-img rounded">
              <img
                onLoad={handleImageLoaded}
                className="img-fluid d-block portfolio-image"
                src={project.thumbImage}
                alt={project.alt}
                style={{ maxHeight: "25vh", margin: "0 auto" }}
              />
              <div className="portfolio-overlay">
                <button
                  className="portfolio-overlay-link popup-ajax stretched-link"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={(e) => handleClick(project, e)}
                  style={{ all: "unset", width: "100%", height: "100%" }} // Übernimmt die volle Größe des übergeordneten Elements
                >
                  <div className="portfolio-overlay-details">
                    <h3
                      className="text-white fw-400"
                      style={{ padding: "1rem" }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )),
    []
  );

  return (
    <>
      <section
        id="portfolio"
        className={`section ${darkTheme ? "bg-dark-2" : "bg-light"}`}
      >
        <div className={`container ${classicHeader ? "" : "px-lg-5"}`}>
          <HeadlineWrapperH2 label="Portfolio" darkTheme={darkTheme} />
          <div className="portfolio popup-ajax-gallery">
            <div className="row portfolio-filter filter-container g-4">
              {prjList}
            </div>
          </div>
        </div>
      </section>
      <ProjectDetailsModal
        projectDetails={selectedProjectDetails}
        darkTheme={darkTheme}
      />
    </>
  );
};

export default Portfolio;
