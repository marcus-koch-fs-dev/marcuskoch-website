import React from "react";
import "./themesToggler.scss";
import { useState } from "react";
import { useEffect } from "react";

const ThemesToggler = ({ size = 20 }) => {
  const [curTheme, setCurTheme] = useState("fa-solid fa-moon");
  const [tempTheme, setTempTheme] = useState("fa-solid fa-moon");
  const [isToggled, setIsToggled] = useState(false);
  const [delay, setDelay] = useState(1500);
  const [active, setActive] = useState("");

  const handleClick = (stg) => {
    setTempTheme(stg.class);
    setActive(stg.angle);
    setDelay(stg.delay);
  };

  useEffect(() => {
    if (active !== "" && typeof active === "string")
      setTimeout(() => {
        setActive("");
        setIsToggled(false);
        setCurTheme(tempTheme);
      }, delay);
  }, [active, delay, tempTheme]);

  const zones = [
    { angle: "0", class: "fa-regular fa-sun", delay: 1750 },
    { angle: "90", class: "fa-solid fa-sun", delay: 1750 },
    { angle: "180", class: "fa-regular fa-moon", delay: 1750 },
    { angle: "270", class: "fa-solid fa-moon", delay: 1000 },
  ];

  return (
    <div className="themes-wrapper">
      <div className="current-theme">
        <i
          className={`${curTheme}`}
          onClick={() => setIsToggled(!isToggled)}
        ></i>
      </div>
      {isToggled && (
        <ul className={`dayZones active-${active}`}>
          {zones.map((stage, index) => (
            <li
              key={index}
              className={`zones zone-${index * 90} active-${active}`}
              onClick={() => handleClick(stage)}
            >
              <i className={`${stage.class} active-${active}`}></i>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemesToggler;
