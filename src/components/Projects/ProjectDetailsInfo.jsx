const ProjectDetailsInfo = ({ projectDetails }) => {
  if (!projectDetails) return null;

  const { title, client, industry, date, result, technologies, projectInfo } =
    projectDetails;
  const techList = technologies
    ? technologies.split(",").map((tech) => tech.trim())
    : [];

  return (
    <div className="detailsInfo">
      <span className="detailsInfo-meta">
        {industry} · {date}
      </span>
      <h3 className="detailsInfo-title">{title}</h3>
      <p className="detailsInfo-client">{client}</p>
      <p className="detailsInfo-result">{result}</p>
      <h4>Info</h4>
      <p>{projectInfo}</p>
      <h4>Tech Stack</h4>
      <ul className="detailsInfo-tech">
        {techList.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetailsInfo;
