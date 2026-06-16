import Eyes from "./Eyes";
import "./about.scss";

const techStack = {
  "💻 Programming Languages": ["JavaScript", "TypeScript", "Python"],
  "🛠 Technologies & Tools:": [
    "React",
    "Redux Toolkit",
    "Next.js",
    "Node.js",
    "Express.js",
    "REST APIs",
    "GraphQL",
    "OAuth 2.0",
    "Web Security",
    "Jest",
    "Cypress",
    "Webpack",
    "Vite",
    "Tailwind CSS",
    "SASS",
    "CSS",
    "SQL (PostgreSQL, MySQL)",
    "MongoDB",
    "Redis",
    "Git",
    "Docker",
    "AI Tools (Claude Code, Cursor, Codex)",
  ],
  "☁️ Cloud & DevOps:": [
    "AWS (S3, CloudFront, ECS, RDS)",
    "Azure DevOps",
    "CI/CD (GitLab, GitHub)",
  ],
  "📊 Methods: ": ["Agile (Scrum)", "Kanban"],
  "🌐 Interests: ": ["Web Performance", "Scalable Architecture"],
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
            , a fullstack developer with 5+ years of experience in TypeScript,
            React and Node.js. My focus is on web performance and scalable
            software architecture. I built a cloud-based tracking system at
            Thyssenkrupp that reduced the manual search for defective components
            from days to seconds and helped avoid expensive compensation cases.
          </p>
          <p className="block">
            <strong>
              <span className="highlight-text"> My journey</span>{" "}
            </strong>
            began as a hardware validation engineer and team lead in the
            automotive industry, where I developed LabVIEW-based test tools.
            That work motivated me to learn advanced programming and eventually
            transition into web development.
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
            my free time, you can find me at the gym doing calisthenics training
            or freediving.
          </p>
        </article>
      </div>
    </section>
  );
};

export default About;
