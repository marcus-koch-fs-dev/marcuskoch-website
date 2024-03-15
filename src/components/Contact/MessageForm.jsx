import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const MessageForm = ({ classicHeader, darkTheme }) => {
  const form = useRef();
  const [sendingMail, setSendingMail] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setSendingMail(true);
    emailjs
      .sendForm(
        "service_i86k3ms",
        "template_si6cin9",
        form.current,
        "c9HsDgGF0tvWyVnAL"
      )
      .then(
        (result) => {
          document.getElementById("contact-form").reset();
          toast.success("Message sent successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: darkTheme ? "dark" : "light",
          });
          console.log(result.text);
          setSendingMail(false);
        },
        (error) => {
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: darkTheme ? "dark" : "light",
          });
          console.log(error.text);
          setSendingMail(false);
        }
      );
  };

  return (
    <div>
      <h2
        className={
          "mb-3 text-5 text-uppercase text-center text-md-start " +
          (darkTheme ? "text-white" : "")
        }
      >
        Hinterlasse Eine Nachricht
      </h2>
      <form
        className={darkTheme ? "form-dark" : ""}
        id="contact-form"
        //Todo add Mail-Server
        action=""
        method="post"
        ref={form}
        onSubmit={sendEmail}
      >
        <div className="row g-4">
          <div className="col-xl-6">
            <input
              name="user_name"
              type="text"
              className="form-control"
              required
              placeholder="Name"
            />
          </div>
          <div className="col-xl-6">
            <input
              name="user_email"
              type="email"
              className="form-control"
              required
              placeholder="Email"
            />
          </div>
          <div className="col">
            <textarea
              name="message"
              className="form-control"
              rows={5}
              required
              placeholder="Erzähle mir wobei ich Dir weiterhelfen kann......"
              defaultValue={""}
            />
          </div>
        </div>
        <p className="text-center mt-4 mb-0">
          <button
            id="submit-btn"
            className="btn btn-primary rounded-pill d-inline-flex"
            type="submit"
          >
            {sendingMail ? (
              <>
                <span
                  role="status"
                  aria-hidden="true"
                  className="spinner-border spinner-border-sm align-self-center me-2"
                ></span>
                Wird Gesendet.....
              </>
            ) : (
              <>Nachricht Senden</>
            )}
          </button>
        </p>
        <ToastContainer />
      </form>
    </div>
  );
};

export default MessageForm;
