import { createContext, useCallback, useState } from "react";
import "../App.scss";
import React, { useContext } from "react";

const themes = {
  day: "day",
  sunrise: "sunrise",
  sundown: "sundown",
  night: "night",
};

const ThemesContext = createContext({
  theme: themes.day,
  changeTheme: (t: string) => {},
});

export const ThemesProvider = ({ children }) => {
  const [theme, setTheme] = useState("day");

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
