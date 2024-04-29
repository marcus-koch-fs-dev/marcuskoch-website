import { useState } from "react";
import { createContext } from "react";
import { commonConfig } from "../config/commonConfig";
import { useEffect } from "react";
// import { stringify } from "querystring";

const isDark = commonConfig.darkTheme;
const loadLocalTheme = localStorage?.getItem("theme");

const curTheme = loadLocalTheme === null ? isDark : JSON.parse(loadLocalTheme);

export const ThemeContext = createContext(curTheme);

const useThemeSetter = () => {
  const [theme, setTheme] = useState(curTheme);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return [theme, setTheme];
};

export default useThemeSetter;
