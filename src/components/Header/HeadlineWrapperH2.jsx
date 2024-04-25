const HeadlineWrapperH2 = ({ label, darkTheme }) => {
  return (
    <section className="position-relative d-flex text-center mb-5">
      <span
        className={
          "text-24  text-uppercase fw-600 w-100 mb-0 " +
          (darkTheme ? "text-muted opacity-1" : "text-light opacity-4")
        }
      >
        {label}
      </span>
      <h2
        className={
          "text-9 text-dark fw-600 position-absolute w-100 align-self-center lh-base mb-0 " +
          (darkTheme ? "text-white" : "text-dark")
        }
      >
        {label}
        <span className="heading-separator-line border-bottom border-3 border-primary d-block mx-auto" />
      </h2>
    </section>
  );
};

export default HeadlineWrapperH2;
