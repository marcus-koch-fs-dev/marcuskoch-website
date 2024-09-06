import { useState } from "react";
import { projectsData } from "./projectList";
import { useMemo } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import "./projects.scss";

const Projects = () => {
  const [selectedProjectDetails, setSelectedProjectDetails] = useState();

  const handleClick = (project, event) => {
    event.preventDefault();
    setSelectedProjectDetails(project);
  };

  const projectList = useMemo(() => {
    return projectsData
      .sort((a, b) => a.id - b.id)
      .map((project, index) => (
        // <li className="item-wrapper" key={project?.id ?? index}>
        <li
          className={`item-wrapper ${project.imgStyle ? "wide" : "narrow"}`}
          key={index}
        >
          <img
            // className={`item-cover ${project.imgStyle ? "wide" : "narrow"}`}
            src={project.thumbImage}
            alt={project.alt}
          />
          <h4 className="item-title">{project.title}</h4>
          <div
            className="item-overlay"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={(e) => handleClick(project, e)}
          >
            <span>Click for Details</span>
            {/* <button
              className="btn-details"
            >
            </button> */}
          </div>
        </li>
      ));
  }, []);
  //   <div className="details-wrapper">
  // </div>

  return (
    <section className="projects">
      <ul className="projects-wrapper">{projectList}</ul>
      {/* <ProjectDetailsModal projectDetails={selectedProjectDetails} /> */}
    </section>
  );
};

export default Projects;
