// src/components/ThemesToggler/ThemesToggler.jsx
import "./themesToggler.scss";
import { useState, useEffect } from "react";
import { THEMES, resolveInitialTheme, applyTheme } from "../../lib/theme";

const ThemesToggler = () => {
  const [theme, setTheme] = useState(() =>
    resolveInitialTheme(typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null)
  );
  const curZone = THEMES.find((zone) => zone.theme === theme);

  const [isToggled, setIsToggled] = useState(false);
  const [temp, setTemp] = useState(curZone);
  const [active, setActive] = useState("");

  // The blocking head script (BaseLayout) may have already set a theme
  // before this island hydrates; sync from the live DOM once on mount.
  useEffect(() => {
    setTheme(resolveInitialTheme(JSON.stringify(document.documentElement.className)));
  }, []);

  const handleClick = (zone) => {
    setActive(zone.angle);
    setTemp(zone);
  };

  useEffect(() => {
    if (active !== "" && typeof active === "string") {
      setTimeout(() => {
        applyTheme(temp.theme);
        setTheme(temp.theme);
        setIsToggled(false);
        setActive("");
      }, temp.delay);
    }
  }, [active, temp]);

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
          {THEMES.map((zone, index) => (
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
