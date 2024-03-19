const ProjectDetailsInfo = ({ darkTheme, projectDetails }) => {
  return (
    <div style={{ padding: "0.5rem" }}>
      {/* <div className="col-md-6" style={{ padding: "0.5rem" }}> */}
      <h4
        className={"text-4 font-weight-600" + (darkTheme ? " text-white" : "")}
      >
        Info:
      </h4>
      <p>{projectDetails?.projectInfo}</p>
    </div>
  );
};

export default ProjectDetailsInfo;
