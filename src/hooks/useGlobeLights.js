import { useEffect, useState } from "react";
import * as THREE from "three";
import { DEFAULT_THEME, isValidTheme } from "../lib/theme";
import { THEME_LIGHT } from "../config/globeHeroConfig";

function readTheme() {
  if (typeof document === "undefined") return DEFAULT_THEME;
  const current = document.documentElement.className;
  return isValidTheme(current) ? current : DEFAULT_THEME;
}

// Creates the globe's sun/fill lights once and keeps them in sync with the
// page's day/night theme (watched via a MutationObserver on <html class>).
export function useGlobeLights(globeRef) {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    setTheme(readTheme());
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    const scene = globe.scene();
    const light = new THREE.DirectionalLight();
    light.name = "theme-sun";
    scene.add(light);
    // Fill light -- without it, a few triangles in the country-polygon
    // mesh (an artifact of draping irregular borders onto the sphere)
    // catch the directional light at a near-grazing angle and render as
    // near-black specks on the land fill.
    const fill = new THREE.AmbientLight(0xffffff, 0.6);
    fill.name = "theme-fill";
    scene.add(fill);
    return () => {
      scene.remove(light);
      scene.remove(fill);
    };
  }, [globeRef]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    const light = globe.scene().getObjectByName("theme-sun");
    const fill = globe.scene().getObjectByName("theme-fill");
    if (!light || !fill) return;
    const { color, position, ambient } = THEME_LIGHT[theme];
    light.color.setHex(color);
    light.intensity = 0.85;
    light.position.set(...position);
    fill.intensity = ambient;
  }, [globeRef, theme]);
}
