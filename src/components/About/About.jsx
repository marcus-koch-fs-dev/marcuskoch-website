import Eyes from "./Eyes";
import "./about.scss";

const techStack = {
  "💻 Programming Languages": ["JavaScript", "TypeScript"],
  "🛠 Technologies & Tools:": [
    "Liquid",
    "React",
    "Redux",
    "Node.js",
    "Express.js",
    "REST APIs",
    "GraphQL",
    "Webpack",
    "Jest",
    "Cypress",
    "Tailwind",
    "SASS",
    "SQL",
    "Git",
    "AI-Tools (GitHub Copilot)",
  ],
  "☁️ Cloud:": [
    "AWS (S3, CloudFront, IAM)",
    "Azure DevOps",
    "Docker",
    "CI/CD (GitLab, GitHub)",
  ],
  "📊 Methods: ": ["Agile (Scrum)", "Kanban"],
  "🌐 Interests: ": ["Web Performance", "Structured Architecture", "Scaling"],
};

const About = () => {
  return (
    <section className="about">
      <Eyes />
      <div className="about-container">
        <h2 className="about-headline">About me</h2>
        <article>
          <p className="block">
            I’m{" "}
            <strong>
              <span className="highlight-text">Marcus Koch</span>
            </strong>
            , a Frontend developer with 5+ years of experience in developing
            enterprise applications with TypeScript and React. My focus is on
            web performance and scalable architecture. I built a cloud-based
            tracking system at Thyssenkrupp that reduced the manual search for
            defective components from days to seconds, which helped avoid
            expensive compensation cases.
          </p>
          <p className="block">
            <strong>
              <span className="highlight-text"> My journey</span>{" "}
            </strong>
            began as a validation engineer, where programming test stands
            inspired me to build my own simple web-based resource planning tool,
            which led me to transition into frontend development.
          </p>
          <p className="block">
            <strong>
              <span className="highlight-text">🚀 My motto:</span>{" "}
            </strong>
            “It’s better to think 5 minutes longer than to spend 5 days fixing
            it.”
          </p>
        </article>
        <div className="tech-badges">
          {Object.entries(techStack).map(([category, items]) => (
            <div key={category} className="tech-category">
              <h4>{category}</h4>
              <ul className="badge-list">
                {items.map((item) => (
                  <li key={item} className="badge">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <article>
          <p className="block">
            <strong>
              <span className="highlight-text">🤸 In </span>
            </strong>
            my free time, you can find me at the gym doing calisthenics
            training, freediving or occasionally gaming.
          </p>
        </article>
      </div>
    </section>
  );
};

export default About;
