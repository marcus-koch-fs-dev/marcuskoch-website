import { useThemeSetter } from "./useThemeSetter";
import { zones } from "../context/ThemesContext";
import { useMemo } from "react";

const useSvgUpdate = () => {
  const [theme] = useThemeSetter();
  const curZone = useMemo(
    () => zones.find((zone) => zone.theme === theme),
    [theme]
  );
  return curZone?.svg ?? "#F4D115";
};

export default useSvgUpdate;
