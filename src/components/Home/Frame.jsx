import React from "react";
import useSvgUpdate from "../../hooks/useSvgUpdate";

// eslint-disable-next-line react/prop-types
const Frame = ({ width = 1440, height = 1440, fill = "#F4D115" }) => {
  fill = useSvgUpdate();
  return (
    <svg
      className="frame-svg"
      width={width}
      height={height}
      viewBox="0 0 1440 1440"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M690.275 -6.10352e-05L148.403 554.649C-49.4677 757.185 -49.4677 1085.56 148.403 1288.1C346.273 1490.63 667.085 1490.63 864.955 1288.1L1440 699.493V-6.10352e-05H690.275Z"
        fill={fill}
      />
    </svg>
  );
};
export default Frame;
