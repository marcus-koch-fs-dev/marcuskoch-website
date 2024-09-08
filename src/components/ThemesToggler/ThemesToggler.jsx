import "./themesToggler.scss";
import { useState, useEffect } from "react";
import { zones } from "../../context/ThemesContext";
import { useThemeSetter } from "../../hooks/useThemeSetter";

const ThemesToggler = () => {
  const [theme, changeTheme] = useThemeSetter();
  const curZone = zones.find((zone) => zone.theme === theme);

  const [isToggled, setIsToggled] = useState(false);
  const [temp, setTemp] = useState(curZone);
  const [active, setActive] = useState("");

  const handleClick = (zone) => {
    setActive(zone.angle);
    setTemp(zone);
  };

  useEffect(() => {
    if (active !== "" && typeof active === "string") {
      setTimeout(() => {
        changeTheme(temp.theme);
        setIsToggled(false);
        setActive("");
      }, temp.delay);
    }
  }, [active, changeTheme, temp]);

  return (
    <div className="themes-wrapper">
      <div className="current-theme">
        <i
          className={`${curZone.class} ${curZone.theme}`}
          onClick={() => setIsToggled(!isToggled)}
        ></i>
      </div>
      {isToggled && (
        <ul className={`dayZones active-${active}`}>
          {zones.map((zone, index) => (
            <li
              key={index}
              className={`zones zone-${index * 90} active-${active}`}
              onClick={() => handleClick(zone)}
            >
              <i className={`${zone.class} active-${active}`}></i>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemesToggler;
