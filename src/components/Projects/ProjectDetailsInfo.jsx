const ProjectDetailsInfo = ({ projectDetails }) => {
  if (!projectDetails) return null;

  const { title, client, industry, date, result, technologies, projectInfo } =
    projectDetails;

  return (
    <div className="detailsInfo">
      <h3 className="detailsInfo-title">{title}</h3>
      <p className="detailsInfo-client">
        {client} · {industry} · {date}
      </p>
      <p className="detailsInfo-result">{result}</p>
      <h4>Info</h4>
      <p>{projectInfo}</p>
      <h4>Tech Stack</h4>
      <p className="detailsInfo-tech">{technologies}</p>
    </div>
  );
};

export default ProjectDetailsInfo;
