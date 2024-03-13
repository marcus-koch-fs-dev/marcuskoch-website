export const filters = {
  PROJECTS: "Projects",
  // BRAND: "Brand",
  PHOTOS: "Photos",
};
export const projectsData = [
  {
    title: "Überarbeitung des \n Launchpad-Frontends",
    projectInfo:
      "Als Entwickler lag mein Fokus auf der Gestaltung einer visuell ansprechenden und responsiven Startseite, die sich verschiedenen Bildschirmgrößen anpasst. Ich führte eine anpassungsfähige Kachelanzeige für Apps und Berichte ein, basierend auf Benutzerrollen, und ermöglichte das Hinzufügen von Favoriten. Zusätzlich entwickelte ich eine separate Administrationsseite für die einfache Verwaltung neuer App-Kacheln.",
    client: "Thyssenkrupp Presta AG",
    results: [
      "Modernes Design verbessert Nutzererfahrung",
      "Apps als Favoriten markierbar",
      "Einfache App-Verwaltung für Admins",
      "i18n für Sprachunterstützung integriert",
    ],
    technologies:
      "React, Redux, Node.js (mit TS), Python, Microservices, REST API, Git, Azure für CI/CD, SAP HANA",
    industry: "Automotive",
    date: "02/2022 - 04/2022",
    thumbImage: "/assets/work/Launch-web.png",
    sliderImages: ["/assets/work/Launch-mobile.png"],
    categories: [filters.PROJECTS],
  },
  {
    title: "Track and Trace - Tracing Component Lifecycles",
    projectInfo:
      "Im Team mit einem DB-Entwickler optimierten wir die Leistung einer App zur Überwachung des Lebenszyklus von Bauteilen. Ziel war es, die Datenverarbeitung zu effektivieren und eine skalierbare Architektur zu schaffen, die zukünftige Erweiterungen unterstützt. Meine Hauptaufgabe war die Entwicklung eines effizienten, stabilen Systems für Frontend und Backend, das auch die Verarbeitung umfangreicher Daten ermöglicht. Gemeinsam identifizierten und lösten wir Systemfehler sowie Probleme im ERP-System.",
    client: "Thyssenkrupp Presta AG",
    results: [
      "Verfolgungszeit von Tagen auf Sekunden reduziert",
      "Intuitive Frontend-Oberfläche entwickelt",
      "Effiziente Suchfunktion mit Autovorschlägen implementiert",
      "Darstellung komplexer Strukturen bei großen Datenmengen",
      "Internationalisierung für weltweite Nutzbarkeit",
      "Neue Funktionen für Komponentenvergleich und Prozessdatenzugriff",
    ],
    technologies:
      "React, Redux, Node.js, Python, Microservices, REST-API, Git, Azure für CI/CD, SAP HANA für SQL-DB-Management, Material UI, AG-Grid",
    industry: "Automotive",
    date: "05/22 - 12/23, fortlaufend",
    thumbImage: "/assets/work/tnt-oneTable-dark.png",
    sliderImages: [
      "/assets/work/tnt-oneTable-dark-nested.png",
      "/assets/work/tnt-twoTable-dark-nested.png",
    ],
    categories: [filters.PROJECTS],
  },
  {
    title: "Cloud Surveillance - Visualisierung von SAP HANA Metadaten",
    projectInfo:
      "Als Frontend-Entwickler arbeitete ich an einer Anwendung zur Überwachung und grafischen Darstellung von Datenbank- und Mikroservice-Objekten. Durch die Integration von Daten aus verschiedenen Mikroservices entwickelte ich Funktionen für die Gruppierung und Verdichtung, um komplexe Filteranforderungen zu erfüllen. Dies ermöglichte eine übersichtliche Präsentation von Mikroservices, Datenbanken und Objekten im SAP HANA-System und erleichterte die Identifikation nicht konformer oder veralteter Elemente.",
    client: "Thyssenkrupp Presta AG",
    results: [
      "Richtlinienverstöße schnell erkannt für sofortige Maßnahmen",
      "Diagramme zeigen Technologieeinsatz und Serviceverteilung",
      "Effizienteres Cloud-Monitoring und -Management",
    ],
    technologies:
      "React, Redux, Node.js, Python, Microservices, REST-API, Git, Azure für CI/CD, SAP HANA für SQL-DB-Management, Material UI, AG-Grid",
    industry: "Automotive",
    date: "05/23 - 07/23",
    thumbImage: "/assets/work/cloud-surveillance.webp",
    categories: [filters.PROJECTS],
  },
  {
    title: "Woundera - Mobile Gesundheitsanwendung",
    projectInfo:
      "Während einer personell herausfordernden Phase unterstützte ich das Team, um die Projektfristen einzuhalten. Als Teil des Entwicklerteams trug ich zur Umsetzung der App bei, die in React Native entwickelt wurde. Die App dient der Erfassung und Verwaltung von Patientendaten, Wundinformationen und Behandlungsverläufen. Zu meinen Kernverantwortlichkeiten gehörten die Entwicklung der Navigationsstruktur, die Integration von CRUD-Funktionen und die Sicherstellung der korrekten Formulareingaben-Validierung. Fehlerbehebungen zur Aufrechterhaltung des Betriebs zählten ebenfalls zu meinen Aufgaben.",
    client: "Sciendis GmbH",
    results: [
      "Formulare effektiv verarbeitet.",
      "Zeitplan eingehalten trotz Personalmangel",
    ],
    technologies:
      "React Native (mit TS), Redux, REST API, Git, Bitbucket, Material UI",
    industry: "Gesundheit",
    date: "12/21 - 01/22, fortlaufend",
    url: {
      name: "www.woundera.health",
      link: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.wundera.health%2F&psig=AOvVaw1ZMtDKc3cSJGPKWa3VyvRk&ust=1710416058091000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOi0icaS8YQDFQAAAAAdAAAAABAD",
    },
    thumbImage: "/assets/work/woundera.webp",
    categories: [filters.PROJECTS],
  },
  {
    title: "Dashboard für zentrale Server-Metadaten",
    projectInfo:
      "Als spezialisiertes Unternehmen für Server-Speicherlösungen entwickelte Arvato ein Dashboard, das Server-Metadaten für Kunden mit Fokus auf Deutschland präsentiert. Mein Beitrag als Entwickler bestand zu Beginn darin, gemeinsam mit Kollegen das Design-Layout umzusetzen. Später konzentrierte ich mich auf die Erstellung wiederverwendbarer UI-Komponenten mittels Storybook und Material UI. Die Qualitätssicherung erfolgte durch Unit-Tests mit Jest.",
    client: "Arvato Systems GmbH",
    results: [
      "Storybook-UI mit Custom-Komponenten erweitert",
      "Grundstein für Dashboard-Entwicklung gelegt",
    ],
    technologies:
      "React (mit TS), Redux, REST API, Git, Material UI, Storybook für dieUI-bibliothek, Jest",
    industry: "IT-Dienstleister",
    date: "06/21 - 11/21, fortlaufend",
    thumbImage: "/assets/work/arvato.webp",
    categories: [filters.PROJECTS],
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
  //   thumbImage: "/public/assets/Hangzhou back yard.JPG",
  //   sliderImages: [
  //     "/public/assets/Hangzhou coffee.JPG",
  //     "/public/assets/Hangzhou tempel.JPG",
  //     "/public/assets/Hanzhou Westlake.JPG",
  //     "/assets/Hangzhou westlake pagode.JPG",
  //   ],
  //   categories: [filters.DESIGN, filters.PHOTOS],
  // },
];
