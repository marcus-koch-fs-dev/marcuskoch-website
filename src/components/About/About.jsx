import Eyes from "./Eyes";
import "./about.scss";

const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 7 4 12l5 5M15 7l5 5-5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCloud = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="4.5" y="13.5" width="15" height="5.5" rx="2.75" />
    <circle cx="9" cy="11.5" r="4" />
    <circle cx="14" cy="9.5" r="5" />
    <circle cx="18" cy="12.5" r="3.2" />
  </svg>
);

const IconBolt = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.18 2.29a.9.9 0 0 0-1.55-.79l-10.2 11.4a.9.9 0 0 0 .67 1.5h7.89l-1.57 7.31a.9.9 0 0 0 1.55.79l10.2-11.4a.9.9 0 0 0-.67-1.5h-7.89l1.57-7.31Z" />
  </svg>
);

const IconFire = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.5c-.6 2.7-2.3 4.6-4.2 6.5C6 10.7 5 12.6 5 14.8 5 19 8.1 22 12 22s7-3 7-7.2c0-3-1.6-5.4-3.2-7.5-.3 1.6-1 2.8-2 3.7-.2-3.2-1-5.6-1.8-8.5Zm1.1 12.3a2.9 2.9 0 0 1-2.2 4.9 2.9 2.9 0 0 1-1-5.6c.4.8 1 1.4 1.7 1.8.3-1.1.9-2 1.5-2.8a4.8 4.8 0 0 1 0 1.7Z" />
  </svg>
);

const techStack = [
  {
    Icon: IconCode,
    label: "Core Stack",
    items: ["TypeScript", "React", "Next.js", "Node.js", "GraphQL"],
  },
  {
    Icon: IconCloud,
    label: "Tooling & Infra",
    items: ["Tailwind CSS", "SASS", "Jest / Cypress", "Docker", "AWS"],
  },
];

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
          <p className="block block--icon">
            <strong>
              <span className="highlight-text">
                <span className="icon-badge">
                  <IconBolt />
                </span>{" "}
                My motto:
              </span>{" "}
            </strong>
            “It’s better to think 5 minutes longer than to spend 5 days fixing
            it.”
          </p>
        </article>
        <div className="tech-badges">
          {techStack.map(({ Icon, label, items }) => (
            <div key={label} className="tech-category">
              <h4>
                <span className="icon-badge">
                  <Icon />
                </span>{" "}
                {label}
              </h4>
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
          <p className="block block--icon">
            <strong>
              <span className="highlight-text">
                <span className="icon-badge">
                  <IconFire />
                </span>{" "}
                In{" "}
              </span>
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
