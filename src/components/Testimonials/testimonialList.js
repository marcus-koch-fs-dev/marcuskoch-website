const personTyp = {
  CLIENT: "Auftraggeber",
  TEAM: "Team-Mitglied",
  FREE: "Freelancer",
};

export const reviews = [
  {
    id: 1,
    name: "Sascha Linvers",
    position: personTyp.TEAM,
    path: "/assets/reference/Sascha-Linvers.jpg",
    location: "Liechtenstein",
    company: "Thyssenkrupp Presta AG",
    desc: "Ich empfehle Marcus Koch als herausragenden Node.js Backend- und React Frontend-Entwickler. Seine Fähigkeit, komplexe Probleme zu lösen und innovative Lösungen zu entwickeln, ist beeindruckend. Er ist ein proaktiver Teamplayer mit einem tiefen Verständnis für beide Technologien. Seine Zuverlässigkeit und sein Engagement machen ihn zu einem wertvollen Mitglied jedes Entwicklungsteams.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sebastian Walther",
    path: "/assets/reference/Sebastian-Walther.jpg",
    position: personTyp.TEAM,
    location: "Österreich",
    company: "Thyssenkrupp Presta AG",
    desc: "In der Zusammenarbeit mit Marcus an einem Produktverfolgungsprojekt beeindruckte mich seine offene Kommunikation und technische Kompetenz. Trotz unterschiedlicher Ansichten fanden wir dank Marcus Fähigkeit zur klaren Verständigung immer optimale Lösungen. Seine geschickte Arbeit im Frontend ermöglichte eine nahtlose Integration der von mir optimierten Datenbankdaten. Marcus Teamgeist und fachliche Expertise machten die Zusammenarbeit nicht nur erfolgreich, sondern auch angenehm. Ich empfehle Marcus als einen hochqualifizierten und kooperativen Entwickler.",
    rating: 5,
  },
  {
    id: 3,
    name: "Konstantins Zimins",
    path: "/assets/reference/Konstantins-Zimins.jpg",
    position: personTyp.TEAM,
    location: "Lettland",
    company: "Arvato Systems",
    desc: "I had the pleasure of working with Marcus few years ago. Marcus demonstrated commendable dedication and a strong willingness to learn. He consistently contributed to the team, displaying solid growth in his technical skills and collaborative spirit. It was a positive experience working alongside him, and I would gladly welcome the opportunity to work with Marcus again in the future.",
    rating: 5,
  },
];
