import "react-toastify/dist/ReactToastify.css";
import MessageForm from "./MessageForm";
// import AppointmentForm from "./AppointmentForm";

const Contact = ({ classicHeader, darkTheme }) => {
  return (
    <section
      id="contact"
      className={"section " + (darkTheme ? "bg-dark-2" : "bg-light")}
    >
      <div className={"container " + (classicHeader ? "" : "px-lg-5")}>
        {/* Heading */}
        <div className="position-relative d-flex text-center mb-5">
          <h2
            className={
              "text-24  text-uppercase fw-600 w-100 mb-0 " +
              (darkTheme ? "text-muted opacity-1" : "text-light opacity-4")
            }
          >
            Kontakt
          </h2>
          <p
            className={
              "text-9 text-dark fw-600 position-absolute w-100 align-self-center lh-base mb-0 " +
              (darkTheme ? "text-white" : "text-dark")
            }
          >
            Kontakt
            <span className="heading-separator-line border-bottom border-3 border-primary d-block mx-auto" />
          </p>
        </div>
        {/* Heading end*/}
        <div className="row gy-5" style={{ justifyContent: "center" }}>
          {/* contact form */}
          <div className="col-md-10 col-xl-8 order-0 order-md-1">
            <MessageForm classicHeader={classicHeader} darkTheme={darkTheme} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
