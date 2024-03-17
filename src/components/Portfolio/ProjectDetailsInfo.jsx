import React from "react";

const ProjectDetailsInfo = ({ darkTheme, projectDetails }) => {
  return (
    <div className="col-md-6" style={{ padding: "0.5rem" }}>
      <h4
        className={"text-4 font-weight-600" + (darkTheme ? " text-white" : "")}
      >
        Info:
      </h4>
      <p>{projectDetails?.projectInfo}</p>
      {/* {projectDetails?.results?.length >= 0 ? (
    <>
      <span
        className={
          "text-dark font-weight-600 me-2" +
          (darkTheme ? " text-white" : "")
        }
      >
        Resultate:
      </span>
      <ul>
        {projectDetails.results.map((result) => {
          return <li>{result}</li>;
        })}
      </ul>
    </>
  ) : null} */}
    </div>
  );
};

export default ProjectDetailsInfo;
