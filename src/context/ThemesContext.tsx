import { createContext, useCallback, useState } from "react";
import "../App.scss";
import React, { useContext } from "react";

export const zones = [
  { angle: "0", class: "fa-regular fa-sun", delay: 1750, theme: "sunrise" },
  { angle: "90", class: "fa-solid fa-sun", delay: 1750, theme: "day" },
  { angle: "180", class: "fa-regular fa-moon", delay: 1750, theme: "sundown" },
  { angle: "270", class: "fa-solid fa-moon", delay: 1000, theme: "night" },
];

const ThemesContext = createContext({
  theme: zones[0].theme,
  changeTheme: (t: string) => {},
});

export const ThemesProvider = ({ children }) => {
  const [theme, setTheme] = useState(zones[1].theme);

  const changeTheme = useCallback((newTheme) => {
    setTheme(newTheme);
  }, []);

  return (
    <ThemesContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemesContext.Provider>
  );
};

export const useMyTheme = () => useContext(ThemesContext);
