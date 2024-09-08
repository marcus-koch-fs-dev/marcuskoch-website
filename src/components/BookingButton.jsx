import "./bookingButton.scss";

const BookingButton = () => {
  return (
    <a
      // tabIndex={0}
      className="contact-button"
      role="button"
      aria-label="Gratis Beratung Buchen"
      // className="btn btn-outline-primary rounded-pill shadow-none smooth-scroll mt-2"
      href="https://calendly.com/marcus-koch-webdev/30min"
      target="_blank"
      rel="noopener noreferrer"
    >
      Contact me
    </a>
  );
};

export default BookingButton;
