const ProjectDetailsMetadata = ({ darkTheme, projectDetails }) => {
  return (
    <div className="col-md-6" style={{ padding: "0.5rem" }}>
      <h4
        className={"text-4 font-weight-600 " + (darkTheme ? " text-white" : "")}
      >
        Details:
      </h4>
      <ul className={"list-style-2 " + (darkTheme ? "list-style-light" : "")}>
        <li>
          <span
            className={
              "text-dark font-weight-600 me-2" +
              (darkTheme ? " text-white" : "")
            }
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
            >
              URL:
            </span>
            <a
              href={projectDetails?.url?.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {projectDetails?.url?.name}
            </a>
          </li>
        )}
      </ul>
      {/* <div className="row no-gutters align-items-center">
                      <div
                        className={
                          "col-auto text-dark font-weight-600" +
                          (darkTheme ? " text-white" : "")
                        }
                      >
                        Share:
                      </div>
                      <div className="col-auto">
                        <ul
                          className={
                            "social-icons" +
                            (darkTheme ? " social-icons-muted" : "")
                          }
                        >
                          <li className="social-icons-facebook">
                            <a
                              data-toggle="tooltip"
                              href={projectDetails?.socialLinks?.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-original-title="Facebook"
                            >
                              <i className="fab fa-facebook-f" />
                            </a>
                          </li>
                          <li className="social-icons-twitter">
                            <a
                              data-toggle="tooltip"
                              href={projectDetails?.socialLinks?.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-original-title="Twitter"
                            >
                              <i className="fab fa-twitter" />
                            </a>
                          </li>
                          <li className="social-icons-google">
                            <a
                              data-toggle="tooltip"
                              href={projectDetails?.socialLinks?.google}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-original-title="Google"
                            >
                              <i className="fab fa-google" />
                            </a>
                          </li>
                          <li className="social-icons-instagram">
                            <a
                              data-toggle="tooltip"
                              href={projectDetails?.socialLinks?.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-original-title="Instagram"
                            >
                              <i className="fab fa-instagram" />
                            </a>
                          </li>
                          <li className="social-icons-email">
                            <a
                              data-toggle="tooltip"
                              href={projectDetails?.socialLinks?.mail}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-original-title="Email"
                            >
                              <i className="fas fa-envelope" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div> */}
    </div>
  );
};

export default ProjectDetailsMetadata;
