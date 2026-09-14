import { Link, useRouteError } from "react-router-dom";
import "./errorPage.scss";

const ErrorPage = () => {
  const error = useRouteError();
  const status = error?.status;
  const message =
    error?.statusText || error?.message || "Something went wrong.";

  return (
    <section className="error-page">
      <div className="error-card">
        <p className="error-status">{status ?? "Error"}</p>
        <h1>This page hit a snag</h1>
        <p className="error-message">{message}</p>
        <Link to="/" className="error-home-link">
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
