import { useEffect } from "react";
import { HOME_VIEW } from "../../../config/globeHeroConfig";

export function useGlobeCamera(globeRef, isHome) {
  useEffect(() => {
    globeRef.current?.pointOfView(HOME_VIEW, 0);
  }, [globeRef]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    globe.controls().autoRotate = isHome;
    globe.controls().autoRotateSpeed = 0.35;
  }, [globeRef, isHome]);
}
