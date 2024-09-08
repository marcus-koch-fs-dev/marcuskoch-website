import { createContext, useCallback, useState } from "react";

export const zones = [
  { angle: "0", class: "fa-regular fa-sun", delay: 1750, theme: "sunrise" },
  { angle: "90", class: "fa-solid fa-sun", delay: 1750, theme: "day" },
  { angle: "180", class: "fa-regular fa-moon", delay: 1750, theme: "sundown" },
  { angle: "270", class: "fa-solid fa-moon", delay: 1000, theme: "night" },
];

const loadLocalTheme = localStorage?.getItem("theme");
const defaultDay = zones[1].theme;
const initialTheme = loadLocalTheme ? JSON.parse(loadLocalTheme) : defaultDay;

export const ThemesContext = createContext({
  theme: initialTheme,
  changeTheme: () => {},
});

export const ThemesProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialTheme);

  const changeTheme = useCallback((newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  }, []);

  return (
    <ThemesContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemesContext.Provider>
  );
};
