import React from "react";
import BookingButton from "./BookingButton";

const Services = ({ classicHeader, darkTheme }) => {
  // services details
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

  return (
    <section
      id="services"
      className={"section " + (darkTheme ? "bg-dark-2" : "bg-light")}
    >
      <div className={"container " + (classicHeader ? "" : "px-lg-5")}>
        {/* Heading */}
        <div className="position-relative d-flex text-center mb-5">
          <h2
            className={
              "text-24  text-uppercase fw-600 w-100 mb-0 " +
              (darkTheme ? "text-white-50  opacity-1" : "text-light  opacity-4")
            }
          >
            Services
          </h2>
          <p
            className={
              "text-9  fw-600 position-absolute w-100 align-self-center lh-base mb-0 " +
              (darkTheme ? "text-white" : "text-dark")
            }
          >
            Services
            <span className="heading-separator-line border-bottom border-3 border-primary d-block mx-auto" />
          </p>
        </div>
        {/* Heading end*/}
        {/* content start */}
        <div className="row">
          <div className="col-lg-11 mx-auto">
            <div className="row">
              {services.length > 0 &&
                services.map((service, index) => (
                  <div className="col-md-6" key={index}>
                    <div className="featured-box style-3 mb-5">
                      <div
                        className={
                          "featured-box-icon text-primary  shadow-sm rounded " +
                          (darkTheme ? "bg-dark-1" : "bg-white")
                        }
                      >
                        <i className={service.icon} />
                      </div>
                      <h3 className={darkTheme ? "text-white" : ""}>
                        {service.name}
                      </h3>
                      <p
                        className={"mb-0 " + (darkTheme ? "text-white-50" : "")}
                      >
                        {service.desc}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* content end */}
        <div
          style={{
            // padding: "0",
            // width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // border: "red solid 1px",
          }}
        >
          <BookingButton />
        </div>
      </div>
    </section>
  );
};

export default Services;
