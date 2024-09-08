import { useContext } from "react";
import { ThemesContext } from "../context/ThemesContext";

export const useThemeSetter = () => {
  const context = useContext(ThemesContext);

  if (!context) {
    throw new Error("useThemeSetter must be used within a ThemesProvider");
  }

  return [context.theme, context.changeTheme];
};
