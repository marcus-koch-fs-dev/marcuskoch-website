export const filters = {
  PROJECTS: "Projects",
  // BRAND: "Brand",
  PHOTOS: "Photos",
};
export const projectsData = [
  {
    id: 1,
    title: "Überarbeitung des Launchpad-Frontends",
    projectInfo:
      "Zwischen Februar und April 2022 habe ich das Frontend eines Cloud-App-Launchpads modernisiert. Mein Fokus lag auf der Entwicklung einer responsiven, visuell ansprechenden Startseite, die an verschiedene Bildschirmgrößen anpassbar ist. Ich implementierte ein benutzerrollenbasiertes Kachelsystem für Apps und Berichte, ermöglichte das Markieren von Favoriten und entwickelte eine Admin-Seite für das einfache Hinzufügen neuer Apps. Diese Arbeit schärfte meine Kompetenzen in responsivem Design und benutzerzentrierter Entwicklung.",
    client: "Thyssenkrupp Presta AG",
    technologies:
      "React, Redux, Node.js (mit TS), Python, Microservices, REST API, Git, Azure für CI/CD, SAP HANA",
    industry: "Automotive",
    date: "02/2022 - 04/2022",
    thumbImage: "/assets/work/Launch-web256.png",
    sliderImages: [
      {
        medium: "/assets/work/Launch-web512.png",
        big: "/assets/work/Launch-web.png",
        desc: "Desktop-Ansicht Launchpad",
      },
      {
        medium: "/assets/work/Launch-mobile512.png",
        big: "/assets/work/Launch-mobile.png",
        desc: "Mobile-Ansicht Launchpad",
      },
    ],
    categories: [filters.PROJECTS],
  },
  {
    id: 2,
    title: "Track and Trace - Tracing Component Lifecycles",
    projectInfo:
      "In dem 'Track and Trace' Projekt optimierte ich eine App zur Überwachung des Lebenszyklus von unseren Lenkgetriebe-Produkte und anderen Komponenten. Mein Fokus lag auf der Performance-Verbesserung, der Entwicklung eines stabilen Frontend- und Backend-Systems für umfangreiche Daten und der Gewährleistung der Responsivität auf diversen Endgeräten weltweit. Zusammen mit einem DB-Entwickler erfassten und optimierten wir Produktionsabläufe, adressierten System- und ERP-Probleme, um die App zukunftssicher und international einsetzbar zu machen.",
    client: "Thyssenkrupp Presta AG",
    technologies:
      "React, Redux, Node.js, Python, Microservices, REST-API, Git, Azure für CI/CD, SAP HANA für SQL-DB-Management, Material UI, AG-Grid",
    industry: "Automotive",
    date: "05/22 - 12/23, fortlaufend",
    thumbImage: "/assets/work/tnt-oneTable-dark256.png",
    sliderImages: [
      {
        medium: "/assets/work/tnt-oneTable-dark512.png",
        big: "/assets/work/tnt-oneTable-dark.png",
        desc: "Konsumierte Teile-Tabelle im Dark-Mode",
      },
      {
        medium: "/assets/work/tnt-oneTable-dark-nested512.png",
        big: "/assets/work/tnt-oneTable-dark-nested.png",
        desc: "Konsumierte Teile-Tabelle im Dark-Mode mit Details",
      },
      {
        medium: "/assets/work/tnt-twoTable-dark-nested512.png",
        big: "/assets/work/tnt-twoTable-dark-nested.png",
        desc: "Konsumierte-Teile & Eingebaut-In Ansicht",
      },
    ],
    categories: [filters.PROJECTS],
  },
  {
    id: 3,
    title: "Cloud Surveillance - Visualisierung von SAP HANA Metadaten",
    projectInfo:
      "Für 'Cloud Surveillance' entwickelte ich eine Anwendung zur effektiven Überwachung und Visualisierung von SAP HANA Metadaten, einschließlich Datenbankobjekten und Mikroservices. Als Frontend-Entwickler integrierte ich Daten aus verschiedenen Quellen und schuf fortgeschrittene Filterfunktionen für Gruppierungen und Verdichtungen. Die Anwendung bietet eine klare Darstellung der Serviceverteilung nach Teams und identifiziert nicht konforme oder veraltete Elemente, wodurch die Datenintegrität und Systemübersicht im SAP HANA-System verbessert werden.",
    client: "Thyssenkrupp Presta AG",
    technologies:
      "React, Redux, Node.js, Python, Microservices, REST-API, Git, Azure für CI/CD, SAP HANA für SQL-DB-Management, Material UI, AG-Grid",
    industry: "Automotive",
    date: "05/23 - 07/23",
    thumbImage: "/assets/work/cloud-surveillance256.jpg",
    sliderImages: [
      {
        medium: "/assets/work/cloud-surveillance512.jpg",
        big: "/assets/work/cloud-surveillance.webp",
        desc: "Symbolbild von Cloud-Surveillance",
      },
    ],
    categories: [filters.PROJECTS],
  },
  {
    id: 4,
    title: "Woundera - Mobile Gesundheitsanwendung",
    projectInfo:
      "In der knappen Personalphase bei 'Woundera', einer Gesundheitsapp, unterstützte ich die Fristeinhaltung. Ich entwickelte wesentliche Teile der in React Native erstellten App zur Verwaltung von Patienten- und Wunddaten. Zu meinen Hauptaufgaben zählten die Erstellung einer intuitiven Navigation, die Implementierung von CRUD-Operationen und die Formularvalidierung. Zudem beseitigte ich kritische Bugs für einen stabilen Betrieb.",
    client: "Sciendis GmbH",
    technologies:
      "React Native (mit TS), Redux, REST API, Git, Bitbucket, Material UI",
    industry: "Gesundheit",
    date: "12/21 - 01/22, fortlaufend",
    url: {
      name: "www.woundera.health",
      link: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.wundera.health%2F&psig=AOvVaw1ZMtDKc3cSJGPKWa3VyvRk&ust=1710416058091000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOi0icaS8YQDFQAAAAAdAAAAABAD",
    },
    thumbImage: "/assets/work/woundera256.jpg",
    sliderImages: [
      {
        medium: "/assets/work/woundera512.jpg",
        big: "/assets/work/woundera.webp",
        desc: "Symbolbild der Woundera-App",
      },
    ],
    categories: [filters.PROJECTS],
  },
  {
    id: 5,
    title: "Dashboard für zentrale Server-Metadaten",
    projectInfo:
      "Im Team bei Arvato trug ich zur Entwicklung eines Dashboards für Server-Metadaten bei, um Kunden sichere Speicherlösungen in Deutschland anzubieten. Mein Beitrag umfasste das gemeinsame Erarbeiten des Design-Layouts und die Entwicklung wiederverwendbarer UI-Komponenten wie Listen, Buttons und Avatare mit Storybook und Material UI. Ich sicherte die Qualität durch Unit-Tests mit Jest.",
    client: "Arvato Systems GmbH",
    technologies:
      "React (mit TS), Redux, REST API, Git, Material UI, Storybook für dieUI-bibliothek, Jest",
    industry: "IT-Dienstleister",
    date: "06/21 - 11/21, fortlaufend",
    thumbImage: "/assets/work/arvato256.jpg",
    sliderImages: [
      {
        medium: "/assets/work/arvato512.jpg",
        big: "/assets/work/arvato.webp",
        desc: "Symbolbild des Arvato Service",
      },
    ],
    categories: [filters.PROJECTS],
  },
  {
    id: 6,
    title: "Hangzhou (China)",
    projectInfo: "Tagesausflug in Hangzhou",
    technologies: "",
    date: "06/21 - 11/21",
    thumbImage: "/assets/arts/Hangzhou/Hangzhou coffee.JPG",
    sliderImages: [
      {
        medium: "/assets/arts/Hangzhou/Hangzhou back yard.JPG",
        big: "/assets/arts/Hangzhou/Hangzhou back yard.JPG",
        desc: "Hinterhof irgendwo in Hangzhou",
      },
      {
        medium: "/assets/arts/Hangzhou/Hangzhou coffee.JPG",
        big: "/assets/arts/Hangzhou/Hangzhou coffee.JPG",
        desc: "Cafe am Westlake",
      },
      {
        medium: "/assets/arts/Hangzhou/Hangzhou westlake pagode.JPG",
        big: "/assets/arts/Hangzhou/Hangzhou westlake pagode.JPG",
        desc: "Liuhe Pagode am Westlake",
      },
    ],
    categories: [filters.PHOTOS],
  },
  {
    id: 7,
    title: "Ningbo (China)",
    projectInfo: "Unterwegs in der Stadt",
    technologies: "",
    date: "06/21 - 11/21",
    thumbImage: "/assets/arts/Ningbo/Ningbo cotton house.jpg",
    sliderImages: [
      {
        medium: "/assets/arts/Ningbo/Enjoy.JPG",
        big: "/assets/arts/Ningbo/Enjoy.JPG",
        desc: "Tianyi Square",
      },
      {
        medium: "/assets/arts/Ningbo/Ningbo cotton house.jpg",
        big: "/assets/arts/Ningbo/Ningbo cotton house.jpg",
        desc: "Ehemaliges Gebäude zur Baumwolleherstellung",
      },
      {
        medium: "/assets/arts/Ningbo/Ningbo night.JPG",
        big: "/assets/arts/Ningbo/Ningbo night.JPG",
        desc: "Promenade am Tianyi Square",
      },
    ],
    categories: [filters.PHOTOS],
  },

  // {
  //   title: "Hangzhou Roundtrip",
  //   projectInfo:
  //     "Quidam lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure. Lisque persius interesset his et, in quot quidam persequeris vim, ad mea essent possim iriure.",
  //   client: "Travel Impressions",
  //   technologies: "iOS, HTML5, CSS3, PHP, Java",
  //   industry: "Art & Design",
  //   date: "July 16, 2019",
  //   url: {
  //     name: "www.example.com",
  //     link: "https://www.example.com",
  //   },
  //   socialLinks: {
  //     facebook: "http://www.facebook.com/",
  //     twitter: "http://www.twitter.com/",
  //     google: "http://www.google.com/",
  //     instagram: "http://www.instagram.com/",
  //     mail: "mailto:example@gmail.com",
  //   },
  //   thumbImage: "/assets/Hangzhou back yard.JPG",
  //   sliderImages: [
  //     "/assets/Hangzhou coffee.JPG",
  //     "/assets/Hangzhou tempel.JPG",
  //     "/assets/Hanzhou Westlake.JPG",
  //     "/assets/Hangzhou westlake pagode.JPG",
  //   ],
  //   categories: [filters.DESIGN, filters.PHOTOS],
  // },
];
