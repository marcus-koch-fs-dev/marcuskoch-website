import { Tooltip } from "./Tooltip";

const TooltipWrapper = ({ label, scrollTopVisible }) => {
  return (
    <Tooltip text={label} placement="left">
      <span
        tabIndex={0}
        aria-label="Zurück zum Anfang navigieren"
        role="button"
        id="back-to-top"
        className="rounded-circle"
        style={{ display: scrollTopVisible ? "inline" : "none" }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <i className="fa fa-chevron-up" />
      </span>
    </Tooltip>
  );
};

export default TooltipWrapper;
