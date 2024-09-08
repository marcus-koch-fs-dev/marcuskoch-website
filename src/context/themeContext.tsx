import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { zones } from "./ThemesContext";

const loadLocalTheme = localStorage?.getItem("theme");
const defaultDay = zones[1].theme;
const curTheme =
  loadLocalTheme === null ? defaultDay : JSON.parse(loadLocalTheme);

export const ThemeContext = createContext(curTheme);

const useThemeSetter = () => {
  const [theme, setTheme] = useState(curTheme);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return [theme, setTheme];
};

export default useThemeSetter;
