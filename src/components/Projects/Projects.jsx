import { useState } from "react";
import { projectsData } from "./projectList";
import { useMemo } from "react";
import "./projects.scss";
import { Overlay } from "./Overlay";
import ProjectDetailsSlider from "./ProjectDetailsSlider";

const Projects = () => {
  const [selectedProjectDetails, setSelectedProjectDetails] = useState();
  const [openOverlay, setOpenOverlay] = useState(false);

  const handleClick = (project, event) => {
    event.preventDefault();
    setOpenOverlay(true);
    setSelectedProjectDetails(project);
  };

  const projectList = useMemo(() => {
    return projectsData
      .sort((a, b) => a.id - b.id)
      .map((project, index) => (
        <li
          className={`item-wrapper ${project.imgStyle ? "wide" : "narrow"}`}
          key={index}
        >
          <img src={project.thumbImage} alt={project.alt} />
          <h4 className="item-title">{project.title}</h4>
          <div
            className="item-overlay"
            onClick={(e) => handleClick(project, e)}
          >
            <span>Click for Details</span>
          </div>
        </li>
      ));
  }, []);

  return (
    <section className="projects">
      <ul className="projects-wrapper">{projectList}</ul>
      {openOverlay && (
        <Overlay handleClose={() => setOpenOverlay(false)}>
          <ProjectDetailsSlider
            darkTheme={false}
            projectDetails={selectedProjectDetails}
          />
          <div>
            {/* <ProjectDetailsInfo
                    darkTheme={darkTheme}
                    projectDetails={projectDetails}
                  /> */}
          </div>
        </Overlay>
      )}
    </section>
  );
};

export default Projects;
