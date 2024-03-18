const ProjectDetailsMetadata = ({ darkTheme, projectDetails }) => {
  return (
    <div className="col-md-6" style={{ padding: "0.5rem" }}>
      <h4
        className={"text-4 font-weight-600 " + (darkTheme ? " text-white" : "")}
        aria-label="project details headline"
      >
        Details:
      </h4>
      <ul
        className={"list-style-2 " + (darkTheme ? "list-style-light" : "")}
        aria-label="project details list"
      >
        <li>
          <span
            className={
              "text-dark font-weight-600 me-2" +
              (darkTheme ? " text-white" : "")
            }
            aria-label="project details item-costumer"
          >
            Kunde:
          </span>
          {projectDetails?.client}
        </li>
        <li>
          <span
            className={
              "text-dark font-weight-600 me-2" +
              (darkTheme ? " text-white" : "")
            }
            aria-label="project details item-technologies"
          >
            Technologien:
          </span>
          <p style={{ wordBreak: "break-word", margin: "0" }}>
            {projectDetails?.technologies}
          </p>
        </li>
        <li>
          <span
            className={
              "text-dark font-weight-600 me-2" +
              (darkTheme ? " text-white" : "")
            }
            aria-label="project details item-branche"
          >
            Branche:
          </span>
          {projectDetails?.industry}
        </li>
        <li>
          <span
            className={
              "text-dark font-weight-600 me-2" +
              (darkTheme ? " text-white" : "")
            }
            aria-label="project details item-period"
          >
            Zeitraum:
          </span>
          {projectDetails?.date}
        </li>
        {projectDetails?.url && (
          <li>
            <span
              className={
                "text-dark font-weight-600 me-2" +
                (darkTheme ? " text-white" : "")
              }
              aria-label="project details item-url"
            >
              URL:
            </span>
            <a
              href={projectDetails?.url?.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="project details item-url-link"
            >
              {projectDetails?.url?.name}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProjectDetailsMetadata;
