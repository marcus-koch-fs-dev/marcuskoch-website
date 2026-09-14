import { useState, useMemo } from "react";
import { projectsData } from "./projectList";
import "./projects.scss";
import { Overlay } from "../Overlay";
import ProjectDetailsInfo from "./ProjectDetailsInfo";

const Projects = () => {
  const [selectedProjectDetails, setSelectedProjectDetails] = useState();
  const [openOverlay, setOpenOverlay] = useState(false);

  const handleClick = (project) => {
    setOpenOverlay(true);
    setSelectedProjectDetails(project);
  };

  const projectList = useMemo(() => {
    return [...projectsData]
      .sort((a, b) => a.id - b.id)
      .map((project) => (
        <li className="project-card" key={project.id}>
          <div className="project-meta">
            <span className="project-industry">{project.industry}</span>
            <span className="project-date">{project.duration}</span>
          </div>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-client">{project.client}</p>
          <p className="project-result">{project.result}</p>
          <p className="project-tech">{project.technologies}</p>
          <button
            type="button"
            className="project-more"
            aria-label={`Details zu ${project.title}`}
            onClick={() => handleClick(project)}
          >
            <span aria-hidden="true">Details →</span>
          </button>
        </li>
      ));
  }, []);

  return (
    <section className="projects">
      <ul className="projects-wrapper">{projectList}</ul>
      {openOverlay && (
        <Overlay handleClose={() => setOpenOverlay(false)}>
          <ProjectDetailsInfo projectDetails={selectedProjectDetails} />
        </Overlay>
      )}
    </section>
  );
};

export default Projects;
