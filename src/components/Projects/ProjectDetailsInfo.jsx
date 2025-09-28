const ProjectDetailsInfo = ({ darkTheme, projectDetails }) => {
  return (
    <div className="detailsInfo">
      {/* <div className="col-md-6" style={{ padding: "0.5rem" }}> */}
      <h4>Info:</h4>
      <p>{projectDetails?.projectInfo}</p>
    </div>
  );
};

export default ProjectDetailsInfo;
