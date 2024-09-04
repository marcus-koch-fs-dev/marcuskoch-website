import React from "react";
import BookingButton from "./BookingButton";
import "./services.scss";

const services = [
  {
    name: "Digitale Transformationsberatung",
    desc: "Optimiere Geschäftsprozesse durch den Einsatz digitaler Technologien.",
    icon: "fa-solid fa-digital-tachograph",
  },
  {
    name: "Responsive Webentwicklung",
    desc: "Erstellung benutzerfreundlicher, responsiver Webseiten und Anwendungen.",
    icon: "fa-solid fa-mobile-alt",
  },
  {
    name: "Web Performance Optimierung",
    desc: "Steigerung der Ladezeiten und Leistung für ein besseres Benutzererlebnis.",
    icon: "fa-solid fa-tachometer-alt",
  },
  {
    name: "Technischer Support",
    desc: "Technische Unterstützung und Beratung für Entwicklerteams.",
    icon: "fa-solid fa-users-cog",
  },
  {
    name: "API-Integration",
    desc: "Integration externer Dienste und APIs zur Erweiterung von Funktionen.",
    icon: "fa-solid fa-plug",
  },
];
const Services = () => {
  const serviceList = services.map((service, index) => (
    <li className="services-item" id="item" key={index}>
      <div className="services-i">
        <i className={service.icon} />
      </div>
      <div className={"text-wrapper"}>
        <h4>{service.name}</h4>
        <p>{service.desc}</p>
      </div>
    </li>
  ));

  return (
    <section className="services">
      <div className="services-wrapper">
        <ul className="services-list">{serviceList}</ul>
        <BookingButton />
      </div>
    </section>
  );
};

export default Services;
