import { Tooltip } from "./Tooltip";

const TooltipWrapper = ({ label, scrollTopVisible }) => {
  return (
    <Tooltip
      text={label}
      placement="left"
      role="button"
      aria-label="Zurück zum Anfang navigieren"
    >
      <span
        id="back-to-top"
        className="rounded-circle"
        style={{ display: scrollTopVisible ? "inline" : "none" }}
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
