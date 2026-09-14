export const projectsData = [
  {
    id: 1,
    title: "Serverless Migration of a Video Platform",
    client: "Baas Film GmbH",
    industry: "Media & Film Production",
    engagement: "Freelance",
    date: "06/26 - 09/26",
    duration: "4 months",
    result:
      "Recurring server maintenance gone without paying for a managed host, 15 EUR per month at worst",
    technologies:
      "React, TypeScript, Redux Toolkit, Node.js, PostgreSQL, Scaleway Serverless, Hetzner Object Storage, ffmpeg, i18n",
    projectInfo:
      "Second stage of the B2B video platform built in 2024. The self-administered VPS gave way to a serverless instance on Scaleway, MySQL to serverless Postgres and the blob storage to Hetzner, which removes the regular patching and monitoring without moving to a far more expensive managed host. Video processing now runs locally, rendering on the owner's machine and uploading only the finished file, so cloud conversion costs no longer apply. Selectable video qualities, internationalization and tests from unit to E2E were added on top.",
  },
  {
    id: 2,
    title: "Website Relaunch for a Trade Business",
    client: "Ruck Zuck GmbH",
    industry: "Skilled Trades",
    engagement: "Freelance",
    date: "03/26 - 04/26",
    duration: "2 months",
    result:
      "Non-responsive legacy site replaced by a mobile-ready relaunch within two months",
    technologies: "React, JavaScript, Claude Design, Claude Code, Codex",
    projectInfo:
      "Relaunch of the website of a trade business whose legacy site was technically outdated, not responsive and overloaded with text, with no corporate design in place. Instead of a conventional requirements workshop, prototypes served as the basis for discussion, with the color scheme derived from the logo and the company vehicle. The HTML prototype was broken down into separate React components for hero, services, gallery and contact, keeping content exchangeable and a later move to a CMS open. The information architecture was narrowed to services, service area and contact route.",
  },
  {
    id: 3,
    title: "Frontend Rebuild of a Video Learning and Quiz Platform",
    client: "Education provider",
    industry: "EdTech / Education",
    engagement: "Freelance",
    date: "03/25 - 12/25",
    duration: "10 months",
    result:
      "Lighthouse score of 93 (desktop) and around 68% test coverage across a full frontend rebuild",
    technologies:
      "React, TypeScript, Redux Toolkit, Styled Components, Storybook, React Flow, Recharts, Axios, Vite, Jest, React Testing Library, Cypress",
    projectInfo:
      "Complete frontend rebuild of a video learning and quiz platform in a team of three, with the existing Java and Spring Boot backend kept behind REST interfaces. The DOM-driven legacy application gave way to a feature-based single page architecture separating course view, video, quiz, creator and user management. Redux Toolkit keeps session, course progress and quiz logic consistent, including when users jump back within the branching skill tree of main and side paths. Stabler callback references, React.memo and lazy loading cut the render load to a Lighthouse score of 93.",
  },
  {
    id: 4,
    title: "B2B Platform for Video Delivery",
    client: "Baas Film GmbH",
    industry: "Media & Film Production",
    engagement: "Freelance",
    date: "04/24 - 12/24",
    duration: "9 months",
    result:
      "FTP delivery replaced, uploads up to 15 GB, Lighthouse score of 97, around 70% test coverage",
    technologies:
      "React, TypeScript, JavaScript, Redux Toolkit, Node.js, Express, MySQL, Multer, ffmpeg, JWT, Jest, Cypress",
    projectInfo:
      "B2B platform for delivering commercials and short documentaries in FHD and 4K. FTP-based delivery gave way to a web platform where clients stream 720p preview videos and comment on them directly, which largely removed email approval loops and review meetings. A server-side upload pipeline handles videos up to 15 GB with asynchronous processing through ffmpeg, backed by an Express and MySQL backend deployed to a VPS at the existing provider for GDPR-compliant infrastructure. Clients and administrators work through a React dashboard with JWT-secured REST endpoints and a 12-month retention policy.",
  },
  {
    id: 5,
    title: "Track & Trace, Component Tracking in Manufacturing",
    client: "Thyssenkrupp Presta AG",
    industry: "Automotive / Manufacturing",
    engagement: "Permanent position",
    date: "05/22 - 12/23",
    duration: "20 months",
    result:
      "Component search reduced from several days to seconds, rendering 2.3 s faster",
    technologies:
      "React, Redux Toolkit, Node.js, Express, Python (Flask), SAP HANA Cloud, REST APIs, AG-Grid, Material UI, Azure DevOps, Jest",
    projectInfo:
      "Global track-and-trace application for an automotive supplier that follows individual components across their entire lifecycle. The core of the solution was pre-generating component trees in the database, which cut a previously manual search from several days down to seconds. Analyzing application state properties with the Redux DevTools slimmed down the component tree and sped up rendering by 2.3 seconds. Delivery ran through Azure DevOps pipelines as a React frontend with Express and Python microservices on SAP HANA Cloud, including internationalization and accessibility for all plants worldwide.",
  },
  {
    id: 6,
    title: "Cloud Launchpad & Cloud Surveillance, Internal Cloud Tools",
    client: "Thyssenkrupp Presta AG",
    industry: "Automotive / Manufacturing",
    engagement: "Permanent position",
    date: "02/22 - 07/23",
    duration: "2 sub-projects, 3 months each",
    result:
      "Around 30% of unused services identified and decommissioned, lowering cloud costs",
    technologies:
      "React, Redux Toolkit, Plotly, AG-Grid, Material UI, SAP HANA, REST API, Node.js, Python, Azure CI/CD",
    projectInfo:
      "Two internal tools covering the group's cloud landscape. Cloud Launchpad replaced an outdated start page with a role and location based overview of all cloud services and Power BI applications, offering configurable tiles, favorites, a dedicated administration page and language support. Cloud Surveillance visualizes SAP HANA resource usage and compliance violations through interactive tables and configurable charts, which made it possible to shut down around 30% of unused services. Both were built in a Scrum team of six full-stack developers working with code reviews and pair programming.",
  },
  {
    id: 7,
    title: "Server Monitoring Dashboard and Mobile Health App",
    client: "Arvato Systems GmbH & Sciendis GmbH",
    industry: "IT Services / Healthcare",
    engagement: "Permanent position via contractor",
    date: "06/21 - 01/22",
    duration: "8 months",
    result:
      "Two client assignments, reusable UI library established and health app delivered on schedule",
    technologies:
      "JavaScript, TypeScript, React, React Native, Redux Toolkit, Storybook, Material UI, Jest, REST API, Azure CI/CD, Bitbucket",
    projectInfo:
      "Two consecutive client assignments through the engineering services provider Brunel. At Arvato Systems the work covered a dashboard for central server metadata and cluster availability, where navigation elements and list structures were prototyped as reusable components in Storybook and covered by Jest. At Sciendis the mobile health application Woundera followed, for which an intuitive navigation structure was built with React Native along with complex wound forms including validation and error handling. Both assignments were frontend-heavy and geared towards clean, testable components.",
  },
];
