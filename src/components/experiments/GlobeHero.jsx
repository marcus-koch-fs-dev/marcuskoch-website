import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { haversineDistanceKm, estimateTravelStats } from "../../lib/geoDistance";
import { projectsData } from "../../data/projectList";
import { PROJECT_LOCATIONS } from "./projectLocations";
import "./globeHero.scss";

// Real location, given by Marcus for this feature.
const MARCUS_COORDS = { lat: 47.5456, lng: 9.6857, label: "Marcus", color: "#ffcc66" };
const HOME_VIEW = { lat: 15, lng: 25, altitude: 3.4 };
const DESTINATION_ZOOM_ALTITUDE = 0.7;

const ABOUT_TEXT =
  "I'm Marcus Koch, a fullstack developer with 5+ years of experience in TypeScript, React and Node.js. My focus is on web performance and scalable software architecture. I built a cloud-based tracking system at Thyssenkrupp that reduced the manual search for defective components from days to seconds and helped avoid expensive compensation cases.";

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
  const stageRef = useRef();
  const audioCtxRef = useRef(null);
  const [theme, setTheme] = useState("day");
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [permissionState, setPermissionState] = useState("idle");
  const [userPoint, setUserPoint] = useState(null);
  const [stats, setStats] = useState(null);
  const [countries, setCountries] = useState([]);
  const [projectsOpen, setProjectsOpen] = useState(false);
  // "home" | "about" | a project id
  const [destination, setDestination] = useState("home");

  useEffect(() => {
    setTheme(readTheme());
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson")
      .then((res) => res.json())
      .then((data) => setCountries(data.features))
      .catch(() => setCountries([]));
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    globe.pointOfView(HOME_VIEW, 0);
  }, []);

  useEffect(() => {
    function updateSize() {
      if (!stageRef.current) return;
      const { width, height } = stageRef.current.getBoundingClientRect();
      setSize({ width, height });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    globe.controls().autoRotate = destination === "home";
    globe.controls().autoRotateSpeed = 0.35;
  }, [destination]);

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

  function playBlip() {
    if (typeof window === "undefined") return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(920, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(460, ctx.currentTime + 0.09);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  }

  function playHoverTick() {
    if (typeof window === "undefined") return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1600, ctx.currentTime);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.07);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  }

  function requestLocation() {
    setPermissionState("requesting");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPoint({ lat: latitude, lng: longitude, label: "Du", color: "#4dd2ff" });
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

  function goHome() {
    playBlip();
    setDestination("home");
    globeRef.current?.pointOfView(HOME_VIEW, 1200);
  }

  function goAbout() {
    playBlip();
    setDestination("about");
    globeRef.current?.pointOfView(
      { lat: MARCUS_COORDS.lat, lng: MARCUS_COORDS.lng, altitude: DESTINATION_ZOOM_ALTITUDE },
      1200
    );
  }

  function selectProject(project) {
    playBlip();
    setDestination(project.id);
    const location = PROJECT_LOCATIONS[project.id];
    if (location) {
      globeRef.current?.pointOfView(
        { lat: location.lat, lng: location.lng, altitude: DESTINATION_ZOOM_ALTITUDE },
        1200
      );
    }
  }

  function toggleProjects() {
    playBlip();
    setProjectsOpen((open) => !open);
  }

  const selectedProject =
    typeof destination === "number" ? projectsData.find((p) => p.id === destination) ?? null : null;
  const selectedLocation = selectedProject ? PROJECT_LOCATIONS[selectedProject.id] : null;
  const aboutOpen = destination === "about";

  const points = [
    MARCUS_COORDS,
    ...(userPoint ? [userPoint] : []),
    ...(selectedLocation
      ? [{ lat: selectedLocation.lat, lng: selectedLocation.lng, label: selectedProject.title, color: "#ff3b3b" }]
      : []),
  ];
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
    <div className="globe-hero">
      <div className="globe-hero__stars" />
      <div className="globe-hero__stars globe-hero__stars--far" />
      <div className="globe-hero__aurora" />
      <div className="globe-hero__vignette" />

      <div className="globe-hero__intro">
        <p className="globe-hero__eyebrow">Marcus Koch</p>
        <h1 className="globe-hero__name">Fullstack Developer</h1>

        <div className="globe-hero__terminal">
          <p className="globe-hero__terminal-title">MU/TH/UR 6000</p>

          <div className="globe-hero__terminal-readout">
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
                <li>Ein Call: unbezahlbar</li>
              </ul>
            )}

            <a
              className="contact-button"
              href="mailto:marcus@marcus-koch.dev?subject=Request&body=Hi%20Marcus,"
            >
              Beende die Stille
            </a>
          </div>

          <nav className="globe-hero__terminal-nav">
            <button
              type="button"
              className={destination === "home" ? "active" : ""}
              onClick={goHome}
              onMouseEnter={playHoverTick}
            >
              &gt; HOME
            </button>
            <button
              type="button"
              className={aboutOpen ? "active" : ""}
              onClick={goAbout}
              onMouseEnter={playHoverTick}
            >
              &gt; ABOUT_ME
            </button>
            <button
              type="button"
              className="globe-hero__terminal-nav-toggle"
              onClick={toggleProjects}
              onMouseEnter={playHoverTick}
            >
              &gt; PROJECTS {projectsOpen ? "▾" : "▸"}
            </button>
            {projectsOpen && (
              <ul className="globe-hero__terminal-projects">
                {projectsData.map((project) => (
                  <li key={project.id}>
                    <button
                      type="button"
                      className={project.id === destination ? "active" : ""}
                      onClick={() => selectProject(project)}
                      onMouseEnter={playHoverTick}
                    >
                      {project.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </div>
      </div>

      <div className="globe-hero__stage" ref={stageRef}>
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          showGlobe={false}
          showAtmosphere={true}
          atmosphereColor="#3a6bd8"
          atmosphereAltitude={0.25}
          backgroundColor="rgba(0,0,0,0)"
          polygonsData={countries}
          polygonCapColor={() => "#2851b8"}
          polygonSideColor={() => "rgba(40, 81, 184, 0.25)"}
          polygonStrokeColor={() => "#2851b8"}
          polygonAltitude={0.006}
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointLabel="label"
          pointColor={(d) => d.color}
          pointRadius={0.4}
          pointAltitude={0.01}
          arcsData={arcs}
          arcColor={() => "#ffcc66"}
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={1500}
        />

        {aboutOpen && (
          <div className="globe-hero__info-popup">
            <button
              type="button"
              className="globe-hero__info-popup-close"
              onClick={goHome}
              aria-label="Schließen"
            >
              &times;
            </button>
            <p className="globe-hero__info-popup-location">{"// Lindau, Bodensee"}</p>
            <h2>About Me</h2>
            <p className="globe-hero__info-popup-body">{ABOUT_TEXT}</p>
          </div>
        )}

        {selectedProject && (
          <div className="globe-hero__info-popup">
            <button
              type="button"
              className="globe-hero__info-popup-close"
              onClick={goHome}
              aria-label="Schließen"
            >
              &times;
            </button>
            <p className="globe-hero__info-popup-location">
              {`// ${selectedLocation?.city ?? "UNKNOWN_LOCATION"}`}
            </p>
            <h2>{selectedProject.title}</h2>
            <p className="globe-hero__info-popup-meta">
              {selectedProject.client} — {selectedProject.industry}
            </p>
            <p className="globe-hero__info-popup-body">{selectedProject.projectInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
}
