import Eyes from "./Eyes";
import "./about.scss";

const IconWrench = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21.7 16.8a5 5 0 0 1-6.7 5.9L4.5 22.3a2 2 0 0 1-1.4-3.4l10.4-10.4a5 5 0 0 1 6-6.6l-3.6 3.6 1.4 1.4 3.6-3.6a5 5 0 0 1 .8 3.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCloud = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 18a4.5 4.5 0 0 1-.6-8.96A5.5 5.5 0 0 1 17.2 9.1 4 4 0 0 1 16.5 18H7Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconRocket = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.5 9.5c2-2 5-2.5 6.5-2 .5 1.5 0 4.5-2 6.5l-2 2-4.5-4.5 2-2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m12.5 11.5-5 5 2 2 5-5M8 14 5 15l4-4M10 16l-1 3 3-1"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconGymnastics = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="17" cy="5" r="1.8" fill="currentColor" />
    <path
      d="M6 20 10 13l2-3 3 2 3-1M10 13l-4-2M12 10 9 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const techStack = [
  {
    Icon: IconWrench,
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
                  <IconRocket />
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
                  <IconGymnastics />
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
