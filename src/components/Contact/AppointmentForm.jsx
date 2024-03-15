import React from "react";

const AppointmentForm = ({ darkTheme }) => {
  return (
    <div
      style={{
        display: "flex", // Make this a flex container
        flexDirection: "column", // Stack children vertically
        alignItems: "center",
        flex: 1,
      }}
    >
      <h2
        className={
          "mb-3 text-5 text-uppercase text-center text-md-start " +
          (darkTheme ? "text-white" : "")
        }
      >
        Oder buche gleich einen Termin
      </h2>
      <form
        action="https://calendly.com/marcus-koch-react/30min"
        target="_blank"
        // style={{ margin: "0 auto" }}
      >
        <button
          id="submit-btn"
          className="btn btn-primary rounded-pill d-inline-flex"
          type="submit"
        >
          Jetzt Termin Buchen
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
