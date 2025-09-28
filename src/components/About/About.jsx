import Eyes from "./Eyes";
import "./about.scss";

const techStack = {
  Frontend: [
    "React",
    "React Native (Expo)",
    "Redux",
    "Material UI",
    "Tailwind",
    "Apollo",
    "GraphQL",
  ],
  Backend: ["Node.js (Express.js)", "Liquid", "SAP HANA", "SQL/NoSQL"],
  Tools: ["Git", "Docker", "Azure CI/CD", "Storybook", "Figma", "PlatformIO"],
  Testing: ["Jest", "Vitest", "Playwright"],
};

const About = () => {
  return (
    <section className="about">
      <Eyes />
      <div className="about-container">
        <h2 className="about-headline">About me</h2>
        <article>
          <p className="block">
            I’m <span className="highlight-text">Marcus Koch</span>, a
            Full-Stack Developer with experience in React, Node.js and modern
            web technologies. I started my journey in automotive validation and
            hardware testing, later transitioned into web development and now
            combine my background with E-Commerce and IoT projects.
          </p>
          <p className="block">
            <span className="highlight-text"> Curiosity </span>drives me. I
            enjoy creating products that solve real problems and experimenting
            with digital tools that connect to the physical world. Sports like
            freediving and calisthenics keep me balanced and often inspire my
            approach to building.
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
      </div>
    </section>
  );
};

export default About;
