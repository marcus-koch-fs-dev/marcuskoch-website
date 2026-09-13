export const projectsData = [
  {
    id: 1,
    title: "Server Metadata Dashboard",
    client: "Arvato Systems GmbH",
    industry: "IT Services",
    date: "06/21 - 11/21",
    result: "~30% ungenutzte Services eliminiert → geringere Skalierungskosten",
    technologies:
      "React (TS), Redux, REST API, Git, Material UI, Storybook, Jest, Sketch",
    projectInfo:
      "Established Azure DevOps CI/CD pipelines for deploying React frontends and Express.js/Python microservices to SAP HANA Cloud, ensuring global availability with minimal downtime. Built a resource monitoring dashboard that identified and eliminated ~30% unused services, reducing vertical scaling costs.",
  },
  {
    id: 2,
    title: "Launchpad Frontend Modernization",
    client: "Thyssenkrupp Presta AG",
    industry: "Automotive",
    date: "02/2022 - 04/2022",
    result: "Modernisierte Cloud-Startseite mit positivem Key-User-Feedback",
    technologies:
      "React, Redux, Node.js (TS), Python, Microservices, REST API, Git, Azure CI/CD, SAP HANA",
    projectInfo:
      "Redesigned the outdated cloud launchpad frontend into a modern, responsive start page with role-based app tiles, favorites, and an administration page for managing new apps. The update improved usability and received positive feedback from key users for its clarity and design.",
  },
  {
    id: 3,
    title: "Woundera - Mobile Health Application",
    client: "Sciendis GmbH",
    industry: "Healthcare",
    date: "12/21 - 01/22",
    result: "Release termingerecht trotz reduzierter Team-Kapazität gesichert",
    technologies:
      "React Native (TS), Redux, REST API, Git, Bitbucket, Material UI, Expo",
    projectInfo:
      "Contributed to the React Native mobile app Woundera during a critical phase of reduced team capacity. Implemented navigation flows, CRUD operations, and form validation for managing patient and wound data, and fixed critical bugs to ensure the release stayed on schedule.",
  },
  {
    id: 4,
    title: "Track and Trace - Component Lifecycle Tracing",
    client: "Thyssenkrupp Presta AG",
    industry: "Automotive",
    date: "05/22 - 12/23",
    result: "Suchzeiten −95%: von Tagen auf Sekunden",
    technologies:
      "React, Redux, Node.js, Python, Microservices, REST API, Git, Azure CI/CD, SAP HANA, Material UI, AG-Grid",
    projectInfo:
      "Optimized the Track & Trace application for monitoring lifecycles of steering gear and other components. Focused on frontend and backend stability to handle millions of records, implemented advanced search with BOM comparison and process quality reporting, and enabled international use with i18n. The redesign reduced search times by over 95%, from days to seconds.",
  },
  {
    id: 5,
    title: "Cloud Surveillance - SAP HANA Metadata Visualization",
    client: "Thyssenkrupp Presta AG",
    industry: "Automotive",
    date: "05/23 - 07/23",
    result: "Compliance-Sichtbarkeit ~50% verbessert → schnellere Reaktionen",
    technologies:
      "React, Redux, Node.js, Python, Microservices, REST API, Git, Azure CI/CD, SAP HANA, Material UI, AG-Grid, Plotly",
    projectInfo:
      "Developed a monitoring dashboard to visualize SAP HANA metadata, databases, and microservices. Implemented fast filtering and grouping logic in the frontend and delivered clear plots of service distribution with React, Redux, AG-Grid, and Plotly. The solution improved visibility of compliance issues by about 50%, allowing quicker administrative responses.",
  },
  {
    id: 6,
    title: "Video Management Platform Modernization",
    client: "Baas Film GmbH",
    industry: "Media & Entertainment",
    date: "04/2024 - 12/2024",
    result: "Lighthouse-Score 97, Uploads bis 15 GB, ~70/60% Testabdeckung",
    technologies:
      "React, Redux, Node.js (Express.js), Material UI, MySQL, IONOS S3, fluent-ffmpeg, Git",
    projectInfo:
      "Built a B2B video platform to replace an FTP-based workflow, enabling clients to securely stream (720p), comment on, and manage FHD/4K video content via a web interface. Developed a monolithic Express.js and MySQL backend deployed via GitHub CI/CD on a self-managed IONOS VPS to meet infrastructure and GDPR requirements. Implemented a server-side upload pipeline handling videos up to 15GB using asynchronous fluent-ffmpeg processing for previews and thumbnails. Developed a React and TypeScript dashboard with JWT-secured REST APIs, and improved performance and accessibility, achieving a Lighthouse score of 97. Strengthened reliability through automated testing with Jest and Cypress, reaching ~70% frontend and ~60% backend coverage.",
  },
];
