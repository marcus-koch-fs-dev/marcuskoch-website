import "./bookingButton.scss";

const BookingButton = () => {
  return (
    <a
      className="contact-button"
      aria-label="Send E-Mail to Marcus Koch"
      href="mailto:marcus@marcus-koch.dev?subject=Request&body=Hi%20Marcus,"
    >
      Contact me
    </a>
  );
};

export default BookingButton;
