export const projectsData = [
  {
    id: 2,
    title: "Launchpad Frontend Modernization",
    alt: "Launchpad - Screenshot. Homepage of the TK Cloud",
    projectInfo:
      "Redesigned the outdated cloud launchpad frontend into a modern, responsive start page with role-based app tiles, favorites, and an administration page for managing new apps. The update improved usability and received positive feedback from key users for its clarity and design.",
    client: "Thyssenkrupp Presta AG",
    technologies:
      "React, Redux, Node.js (TS), Python, Microservices, REST API, Git, Azure CI/CD, SAP HANA",
    industry: "Automotive",
    date: "02/2022 - 04/2022",
    thumbImage: "/assets/work/Launch-web256.png",
    imgStyle: "wide",
    sliderImages: [
      {
        medium: "/assets/work/Launch-web512.png",
        big: "/assets/work/Launch-web.png",
        desc: "Launchpad start page in desktop view",
      },
      {
        medium: "/assets/work/Launch-mobile512.png",
        big: "/assets/work/Launch-mobile.png",
        desc: "Launchpad start page in mobile view",
      },
    ],
  },
  {
    id: 4,
    title: "Track and Trace - Component Lifecycle Tracing",
    alt: "Track and Trace - Screenshot. Shows a table with extensive component details",
    projectInfo:
      "Optimized the Track & Trace application for monitoring lifecycles of steering gear and other components. Focused on frontend and backend stability to handle millions of records, implemented advanced search with BOM comparison and process quality reporting, and enabled international use with i18n. The redesign reduced search times by over 95%, from days to seconds.",
    client: "Thyssenkrupp Presta AG",
    technologies:
      "React, Redux, Node.js, Python, Microservices, REST API, Git, Azure CI/CD, SAP HANA, Material UI, AG-Grid",
    industry: "Automotive",
    date: "05/22 - 12/23",
    thumbImage: "/assets/work/tnt-oneTable-dark256.png",
    imgStyle: "wide",
    sliderImages: [
      {
        medium: "/assets/work/tnt-oneTable-dark512.png",
        big: "/assets/work/tnt-oneTable-dark.png",
        desc: "Consumed parts table in dark mode",
      },
      {
        medium: "/assets/work/tnt-oneTable-dark-nested512.png",
        big: "/assets/work/tnt-oneTable-dark-nested.png",
        desc: "Nested view with detailed part properties",
      },
      {
        medium: "/assets/work/tnt-twoTable-dark-nested512.png",
        big: "/assets/work/tnt-twoTable-dark-nested.png",
        desc: "Consumed and assembled parts in dual-table view",
      },
    ],
  },
  {
    id: 5,
    title: "Cloud Surveillance - SAP HANA Metadata Visualization",
    alt: "Cloud Surveillance - Screenshot. AI generated image with cloud and connections.",
    projectInfo:
      "Developed a monitoring dashboard to visualize SAP HANA metadata, databases, and microservices. Implemented fast filtering and grouping logic in the frontend and delivered clear plots of service distribution with React, Redux, AG-Grid, and Plotly. The solution improved visibility of compliance issues by about 50%, allowing quicker administrative responses.",
    client: "Thyssenkrupp Presta AG",
    technologies:
      "React, Redux, Node.js, Python, Microservices, REST API, Git, Azure CI/CD, SAP HANA, Material UI, AG-Grid, Plotly",
    industry: "Automotive",
    date: "05/23 - 07/23",
    thumbImage: "/assets/work/cloud-surveillance256.jpg",
    imgStyle: "",
    sliderImages: [
      {
        medium: "/assets/work/cloud-surveillance512.jpg",
        big: "/assets/work/cloud-surveillance.webp",
        desc: "Illustration of service and database visualization",
      },
    ],
  },
  {
    id: 3,
    title: "Woundera - Mobile Health Application",
    alt: "Woundera App - Screenshot. AI generated image with heart and stethoscope.",
    projectInfo:
      "Contributed to the React Native mobile app Woundera during a critical phase of reduced team capacity. Implemented navigation flows, CRUD operations, and form validation for managing patient and wound data, and fixed critical bugs to ensure the release stayed on schedule.",
    client: "Sciendis GmbH",
    technologies:
      "React Native (TS), Redux, REST API, Git, Bitbucket, Material UI, Expo",
    industry: "Healthcare",
    date: "12/21 - 01/22",
    url: {
      name: "www.woundera.health",
      link: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.wundera.health%2F&psig=AOvVaw1ZMtDKc3cSJGPKWa3VyvRk&ust=1710416058091000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOi0icaS8YQDFQAAAAAdAAAAABAD",
    },
    thumbImage: "/assets/work/woundera256.jpg",
    imgStyle: "",
    sliderImages: [
      {
        medium: "/assets/work/woundera512.jpg",
        big: "/assets/work/woundera.webp",
        desc: "Illustration representing Woundera app concept",
      },
    ],
  },
  {
    id: 1,
    title: "Server Metadata Dashboard",
    alt: "Arvato App - Screenshot. AI generated image with connected computers worldwide.",
    projectInfo:
      "Established Azure DevOps CI/CD pipelines for deploying React frontends and Express.js/Python microservices to SAP HANA Cloud, ensuring global availability with minimal downtime. Built a resource monitoring dashboard that identified and eliminated ~30% unused services, reducing vertical scaling costs.",
    client: "Arvato Systems GmbH",
    technologies:
      "React (TS), Redux, REST API, Git, Material UI, Storybook, Jest, Sketch",
    industry: "IT Services",
    date: "06/21 - 11/21",
    thumbImage: "/assets/work/arvato256.jpg",
    imgStyle: "",
    sliderImages: [
      {
        medium: "/assets/work/arvato512.jpg",
        big: "/assets/work/arvato.webp",
        desc: "Illustration of metadata dashboard concept",
      },
    ],
  },
  {
    id: 6,
    title: "Video Management Platform Modernization",
    alt: "Baas GmbH - Video Platform Screenshot",
    projectInfo:
      "Built a B2B video platform to replace an FTP-based workflow, enabling clients to securely stream (720p), comment on, and manage FHD/4K video content via a web interface. Developed a monolithic Express.js and MySQL backend deployed via GitHub CI/CD on a self-managed IONOS VPS to meet infrastructure and GDPR requirements. Implemented a server-side upload pipeline handling videos up to 15GB using asynchronous fluent-ffmpeg processing for previews and thumbnails. Developed a React and TypeScript dashboard with JWT-secured REST APIs, and improved performance and accessibility, achieving a Lighthouse score of 97. Strengthened reliability through automated testing with Jest and Cypress, reaching ~70% frontend and ~60% backend coverage.",
    client: "Baas Film GmbH",
    technologies:
      "React, Redux, Node.js (Express.js), Material UI, MySQL, IONOS S3, fluent-ffmpeg, Git",
    industry: "Media & Entertainment",
    date: "04/2024 - 12/2024",
    thumbImage: "/assets/work/baas256.jpg",
    imgStyle: "",
    sliderImages: [
      {
        medium: "/assets/work/baas512.jpg",
        big: "/assets/work/baas.png",
        desc: "Illustration of the video management platform",
      },
    ],
  },
];
