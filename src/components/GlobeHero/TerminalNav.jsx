import { useState } from "react";
import { projectsData } from "../../data/projectList";
import { citiesLabelFor } from "../../data/projectLocations";
import { TECH_STACK_GROUPS } from "../../config/globeHeroConfig";

export default function TerminalNav({
  destination,
  destinationLabel,
  aboutOpen,
  goHome,
  goAbout,
  selectProject,
  playBlip,
  playHoverTick,
}) {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [techOpen, setTechOpen] = useState(false);

  function toggleProjects() {
    playBlip();
    setProjectsOpen((open) => !open);
  }

  function toggleTechStack() {
    playBlip();
    setTechOpen((open) => !open);
  }

  return (
    <nav className="globe-hero__terminal-nav">
      <p className="globe-hero__terminal-lock">LOCK: {destinationLabel}</p>
      <button type="button" className={destination === "home" ? "active" : ""} onClick={goHome} onMouseEnter={playHoverTick}>
        {destination === "home" ? "●" : "○"} HOME
      </button>
      <button type="button" className={aboutOpen ? "active" : ""} onClick={goAbout} onMouseEnter={playHoverTick}>
        {aboutOpen ? "●" : "○"} ABOUT_ME
      </button>
      <button type="button" className="globe-hero__terminal-nav-toggle" onClick={toggleProjects} onMouseEnter={playHoverTick}>
        {projectsOpen ? "▾" : "▸"} PROJECTS
      </button>
      {projectsOpen && (
        <ul className="globe-hero__terminal-projects">
          {projectsData.map((project) => (
            <li key={project.id}>
              <button
                type="button"
                className={project.id === destination ? "active" : ""}
                onClick={() => selectProject(project)}
                onMouseEnter={playHoverTick}
              >
                <span className="globe-hero__terminal-projects-title">
                  {project.id === destination ? "●" : "○"} {project.title}
                </span>
                <span className="globe-hero__terminal-projects-city">
                  {citiesLabelFor(project.id)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <button type="button" className="globe-hero__terminal-nav-toggle" onClick={toggleTechStack} onMouseEnter={playHoverTick}>
        {techOpen ? "▾" : "▸"} TECH_STACK
      </button>
      {techOpen && (
        <div className="globe-hero__terminal-stack">
          {TECH_STACK_GROUPS.map((group) => (
            <div key={group.label} className="globe-hero__terminal-stack-group">
              <p className="globe-hero__terminal-stack-label">{group.label}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
