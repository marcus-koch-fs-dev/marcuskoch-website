import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { haversineDistanceKm, estimateTravelStats } from "../../lib/geoDistance";
import "./globeHero.scss";

// Placeholder only. This is a public website, not just this repo — pick the
// precision level you're actually comfortable showing (city-level recommended)
// before this goes anywhere near production.
const MARCUS_COORDS = { lat: 52.52, lng: 13.405, label: "Marcus" };

const THEME_LIGHT = {
  sunrise: { color: 0xffd9a0, position: [-3, 0.4, 1.5] },
  day: { color: 0xffffff, position: [1, 3, 2] },
  sundown: { color: 0xff9955, position: [3, 0.3, -1.5] },
  night: { color: 0x8899ff, position: [0, -1, 2] },
};

function readTheme() {
  if (typeof document === "undefined") return "day";
  const current = document.documentElement.className;
  return THEME_LIGHT[current] ? current : "day";
}

export default function GlobeHero() {
  const globeRef = useRef();
  const containerRef = useRef();
  const [theme, setTheme] = useState("day");
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [permissionState, setPermissionState] = useState("idle");
  const [userPoint, setUserPoint] = useState(null);
  const [stats, setStats] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setTheme(readTheme());
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch("https://unpkg.com/three-globe/example/hexed-polygons/ne_110m_admin_0_countries.geojson")
      .then((res) => res.json())
      .then((data) => setCountries(data.features))
      .catch(() => setCountries([]));
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    globe.pointOfView({ altitude: 5 }, 0);
  }, []);

  useEffect(() => {
    function updateSize() {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setSize({ width, height });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.6;
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    const scene = globe.scene();
    const light = new THREE.DirectionalLight();
    light.name = "theme-sun";
    scene.add(light);
    return () => scene.remove(light);
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    const light = globe.scene().getObjectByName("theme-sun");
    if (!light) return;
    const { color, position } = THEME_LIGHT[theme];
    light.color.setHex(color);
    light.position.set(...position);
  }, [theme]);

  function requestLocation() {
    setPermissionState("requesting");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPoint({ lat: latitude, lng: longitude, label: "Du" });
        const distanceKm = haversineDistanceKm(
          latitude,
          longitude,
          MARCUS_COORDS.lat,
          MARCUS_COORDS.lng
        );
        setStats(estimateTravelStats(distanceKm));
        setPermissionState("granted");
      },
      () => setPermissionState("denied"),
      { timeout: 10000 }
    );
  }

  const points = userPoint ? [MARCUS_COORDS, userPoint] : [MARCUS_COORDS];
  const arcs = userPoint
    ? [
        {
          startLat: MARCUS_COORDS.lat,
          startLng: MARCUS_COORDS.lng,
          endLat: userPoint.lat,
          endLng: userPoint.lng,
        },
      ]
    : [];

  return (
    <div className="globe-hero" ref={containerRef}>
      <Globe
        ref={globeRef}
        width={size.width}
        height={size.height}
        showGlobe={false}
        showAtmosphere={true}
        atmosphereColor="#7fb0e0"
        atmosphereAltitude={0.2}
        backgroundColor="rgba(0,0,0,0)"
        hexPolygonsData={countries}
        hexPolygonResolution={3}
        hexPolygonMargin={0.3}
        hexPolygonAltitude={0.005}
        hexPolygonColor={() => "#4a72b8"}
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointLabel="label"
        pointColor={() => "#ffcc66"}
        pointRadius={0.4}
        pointAltitude={0.01}
        arcsData={arcs}
        arcColor={() => "#ffcc66"}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={1500}
      />

      <div className="globe-hero__panel">
        {permissionState !== "granted" && (
          <>
            <p>Erlaube deinen Standort, um zu sehen, wie weit du von Marcus entfernt bist.</p>
            <button
              type="button"
              onClick={requestLocation}
              disabled={permissionState === "requesting"}
            >
              {permissionState === "requesting" ? "Frage Standort ab…" : "Standort erlauben"}
            </button>
            {permissionState === "denied" && <p>Standort wurde nicht freigegeben.</p>}
          </>
        )}

        {stats && (
          <ul className="globe-hero__stats">
            <li>{stats.distanceKm} km entfernt</li>
            <li>Mit dem Auto: ~{stats.carMinutes} min</li>
            <li>Zu Fuß: ~{stats.walkMinutes} min</li>
            <li>Ein Call: ~{stats.callMs} ms</li>
          </ul>
        )}

        <a
          className="contact-button"
          href="mailto:marcus@marcus-koch.dev?subject=Request&body=Hi%20Marcus,"
        >
          Beende die Stille
        </a>
      </div>
    </div>
  );
}
