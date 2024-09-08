import "./themesToggler.scss";
import { useState } from "react";
import { useEffect } from "react";
import useThemeSetter from "../../context/themeContext";
import { zones } from "../../context/ThemesContext";

const ThemesToggler = () => {
  const [theme, setTheme] = useThemeSetter();
  const curData = zones.filter((ct) => ct.theme === theme)[0];

  const [delay, setDelay] = useState(curData.delay);
  const [curZone, setCurZone] = useState(curData);
  const [isToggled, setIsToggled] = useState(false);
  const [active, setActive] = useState("");

  const handleClick = (stg) => {
    setCurZone(stg);
    setActive(stg.angle);
    setDelay(stg.delay);
  };

  useEffect(() => {
    if (active !== "" && typeof active === "string")
      setTimeout(() => {
        setIsToggled(false);
        setActive("");
        setTheme(curZone.theme);
      }, delay);
  }, [active, delay, curZone, setTheme]);

  return (
    <div className="themes-wrapper">
      <div className="current-theme">
        <i
          className={`${curZone.class}`}
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
