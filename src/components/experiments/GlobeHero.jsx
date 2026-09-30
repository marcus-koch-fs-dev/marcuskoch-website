import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { haversineDistanceKm, estimateTravelStats, formatDuration } from "../../lib/geoDistance";
import { projectsData } from "../../data/projectList";
import { PROJECT_LOCATIONS } from "./projectLocations";
import "./globeHero.scss";

// Real location, given by Marcus for this feature.
const MARCUS_COORDS = { lat: 47.5456, lng: 9.6857, label: "Marcus", color: "#ffcc66" };
const HOME_VIEW = { lat: 15, lng: 25, altitude: 1.7 };
const DESTINATION_ZOOM_ALTITUDE = 0.35;
const PENDING_RANGE = "AWAITING COORDS";

// A project can span more than one location (see project 7). These stay
// pure/standalone so the zoom math is easy to reason about in isolation.
function locationCenter(locations) {
  const lat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
  const lng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;
  return { lat, lng };
}

function zoomAltitudeFor(locations) {
  if (locations.length < 2) return DESTINATION_ZOOM_ALTITUDE;
  const [a, b] = locations;
  const spanKm = haversineDistanceKm(a.lat, a.lng, b.lat, b.lng);
  return Math.max(DESTINATION_ZOOM_ALTITUDE, Math.min(0.8, spanKm / 300));
}

const ABOUT_TEXT =
  "I'm Marcus Koch, a fullstack developer with 5+ years of experience in TypeScript, React and Node.js. My focus is on web performance and scalable software architecture. I built a cloud-based tracking system at Thyssenkrupp that reduced the manual search for defective components from days to seconds and helped avoid expensive compensation cases.";

const THEME_LIGHT = {
  sunrise: { color: 0xffd9a0, position: [-3, 0.4, 1.5] },
  day: { color: 0xffffff, position: [1, 3, 2] },
  sundown: { color: 0xff9955, position: [3, 0.3, -1.5] },
  night: { color: 0x8899ff, position: [0, -1, 2] },
};

const GLOBE_COLORS = {
  ocean: "#03130d",
  stroke: "#3dffa0",
  // Dots at ~65% opacity (nudged up from 55% for continent legibility);
  // brighter for DE (near home base).
  dot: "rgba(61, 255, 160, 0.68)",
  dotBright: "rgba(61, 255, 160, 0.9)",
  // Paper-thin coastline stroke layered under the dots for extra definition.
  coastline: "rgba(61, 255, 160, 0.3)",
};
const globeMaterial = new THREE.MeshPhongMaterial({ color: GLOBE_COLORS.ocean });

// Condensed from the real About page's tech-badges list.
const TECH_STACK_GROUPS = [
  { label: "Frontend", items: ["TypeScript", "React", "Next.js"] },
  { label: "Backend", items: ["Node.js", "Python", "GraphQL"] },
  { label: "Infra", items: ["PostgreSQL", "MongoDB", "Redis", "AWS", "Docker", "Jest // Cypress"] },
];

const TWINKLE_STAR_COLORS = ["#ffffff", "#ffe1b3", "#ff9e80", "#9fdcff"];

function makeTwinkleStars(count, seed) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, (_, i) => {
    const size = 1 + rand() * 2.2;
    return {
      id: i,
      left: rand() * 100,
      top: rand() * 100,
      size,
      color: TWINKLE_STAR_COLORS[Math.floor(rand() * TWINKLE_STAR_COLORS.length)],
      delay: rand() * 6,
      duration: 2.5 + rand() * 3.5,
    };
  });
}

const TWINKLE_STARS = makeTwinkleStars(55, 42);

function readTheme() {
  if (typeof document === "undefined") return "day";
  const current = document.documentElement.className;
  return THEME_LIGHT[current] ? current : "day";
}

function renderGlowText(text) {
  const nodes = [];
  text.split(" ").forEach((word, wi) => {
    if (wi > 0) nodes.push(" ");
    nodes.push(
      <span className="globe-hero__word" key={wi}>
        {word.split("").map((char, ci) => (
          <span key={ci}>{char}</span>
        ))}
      </span>
    );
  });
  return nodes;
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
  const [techOpen, setTechOpen] = useState(false);
  // "home" | "about" | a project id
  const [destination, setDestination] = useState("home");

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
    const large = destination === "about";
    let ticks = 0;
    const id = setInterval(() => {
      const marker = document.querySelector(".globe-hero__avatar-marker");
      if (marker) marker.classList.toggle("globe-hero__avatar-marker--large", large);
      ticks += 1;
      if (ticks > 15) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, [destination]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const letters = document.querySelectorAll(".globe-hero__name .globe-hero__word span");
      letters.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add("glow-pulse");
          setTimeout(() => el.classList.remove("glow-pulse"), 250);
        }, i * 55);
      });
    }, 3000);
    return () => clearTimeout(timer);
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
    light.intensity = 0.85;
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
    osc.type = "sine";
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.14, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
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
        setUserPoint({ lat: latitude, lng: longitude, label: "You", color: "#4dd2ff" });
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
    const locations = PROJECT_LOCATIONS[project.id];
    if (locations?.length) {
      globeRef.current?.pointOfView(
        { ...locationCenter(locations), altitude: zoomAltitudeFor(locations) },
        1200
      );
    }
  }

  function toggleProjects() {
    playBlip();
    setProjectsOpen((open) => !open);
  }

  function toggleTechStack() {
    playBlip();
    setTechOpen((open) => !open);
  }

  const selectedProject =
    typeof destination === "number" ? projectsData.find((p) => p.id === destination) ?? null : null;
  const selectedLocations = selectedProject ? PROJECT_LOCATIONS[selectedProject.id] : null;
  const selectedCities = selectedLocations?.map((loc) => loc.city).join(" / ") ?? "UNKNOWN_LOCATION";
  const aboutOpen = destination === "about";
  const destinationLabel = aboutOpen
    ? "ABOUT_ME — LINDAU, DE"
    : selectedProject
    ? `${selectedProject.title.toUpperCase()} — ${selectedCities.toUpperCase()}`
    : "HOME BASE";

  const points = [
    // Small precise surface dot under the avatar marker -- the HTML
    // overlay is easy to read as "somewhere near here", this pins the
    // exact coordinate regardless of camera angle.
    { lat: MARCUS_COORDS.lat, lng: MARCUS_COORDS.lng, label: "HOME BASE: LINDAU, DE", color: "#ffcc66" },
    ...(userPoint ? [userPoint] : []),
    ...(selectedLocations
      ? selectedLocations.map((loc) => ({
          lat: loc.lat,
          lng: loc.lng,
          label: `${selectedProject.title} — ${loc.city}`,
          color: "#ff3b3b",
        }))
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
      <div className="globe-hero__twinkle-stars">
        {TWINKLE_STARS.map((star) => (
          <span
            key={star.id}
            className="globe-hero__twinkle-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>
      <div className="globe-hero__aurora" />
      <div className="globe-hero__vignette" />

      <div className="globe-hero__intro">
        <p className="globe-hero__eyebrow">{renderGlowText("Fullstack Developer")}</p>
        <h1 className="globe-hero__name">{renderGlowText("Marcus Koch")}</h1>
        <p className="globe-hero__tagline">TypeScript · React · Node.js — based in Lindau, DE</p>

        <div className="globe-hero__terminal">
          <p className="globe-hero__terminal-title">MU/TH/UR 6000</p>

          <div className="globe-hero__terminal-body">
            <div className="globe-hero__terminal-readout">
              <div className="globe-hero__intel">
                <p className="globe-hero__intel-title">NAV: ROUTE TO HOME BASE</p>
                <ul className="globe-hero__stats">
                  <li>
                    <span>Range</span>
                    <span className="globe-hero__stats-leader" />
                    <span>{stats ? `${stats.distanceKm} km` : PENDING_RANGE}</span>
                  </li>
                  <li>
                    <span>Ground transport</span>
                    <span className="globe-hero__stats-leader" />
                    <span>{stats ? formatDuration(stats.carMinutes) : PENDING_RANGE}</span>
                  </li>
                  <li>
                    <span>EVA (on foot)</span>
                    <span className="globe-hero__stats-leader" />
                    <span>{stats ? formatDuration(stats.walkMinutes) : PENDING_RANGE}</span>
                  </li>
                  <li>
                    <span>Airborne</span>
                    <span className="globe-hero__stats-leader" />
                    <span>{stats ? `${formatDuration(stats.planeMinutes)} (incl. security)` : PENDING_RANGE}</span>
                  </li>
                  <li>
                    <span>Transmission</span>
                    <span className="globe-hero__stats-leader" />
                    <span>
                      INSTANT{" "}
                      <a
                        className="globe-hero__stats-send"
                        href="mailto:marcus@marcus-koch.dev?subject=Request&body=Hi%20Marcus,"
                        onMouseEnter={playHoverTick}
                      >
                        [ SEND &gt; ]
                      </a>
                    </span>
                  </li>
                </ul>
                {permissionState !== "granted" && (
                  <p className="globe-hero__terminal-hint">
                    {permissionState === "denied" ? (
                      "Location access denied — range unknown."
                    ) : (
                      <>
                        Allow location for exact range.{" "}
                        <button
                          type="button"
                          onClick={requestLocation}
                          onMouseEnter={playHoverTick}
                          disabled={permissionState === "requesting"}
                        >
                          {permissionState === "requesting" ? "[ ACQUIRING… ]" : "[ ACQUIRE POSITION ]"}
                        </button>
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>

            <nav className="globe-hero__terminal-nav">
              <p className="globe-hero__terminal-lock">LOCK: {destinationLabel}</p>
              <button
                type="button"
                className={destination === "home" ? "active" : ""}
                onClick={goHome}
                onMouseEnter={playHoverTick}
              >
                {destination === "home" ? "●" : "○"} HOME
              </button>
              <button
                type="button"
                className={aboutOpen ? "active" : ""}
                onClick={goAbout}
                onMouseEnter={playHoverTick}
              >
                {aboutOpen ? "●" : "○"} ABOUT_ME
              </button>
              <button
                type="button"
                className="globe-hero__terminal-nav-toggle"
                onClick={toggleProjects}
                onMouseEnter={playHoverTick}
              >
                {projectsOpen ? "▾" : "▸"} PROJECTS
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
                        <span className="globe-hero__terminal-projects-title">
                          {project.id === destination ? "●" : "○"} {project.title}
                        </span>
                        <span className="globe-hero__terminal-projects-city">
                          {PROJECT_LOCATIONS[project.id]?.map((loc) => loc.city).join(" / ") ??
                            "UNKNOWN_LOCATION"}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                className="globe-hero__terminal-nav-toggle"
                onClick={toggleTechStack}
                onMouseEnter={playHoverTick}
              >
                {techOpen ? "▾" : "▸"} TECH_STACK
              </button>
              {techOpen && (
                <div className="globe-hero__terminal-stack">
                  {TECH_STACK_GROUPS.map((group) => (
                    <div key={group.label} className="globe-hero__terminal-stack-group">
                      <p className="globe-hero__terminal-stack-label">{group.label}</p>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </nav>
          </div>
        </div>

        <div className="globe-hero__status-log">
          <p aria-hidden="true">&gt; STATUS: NOMINAL</p>
          <p>
            &gt; GITHUB:{" "}
            <a
              href="https://github.com/marcus-koch-fs-dev"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverTick}
            >
              marcus-koch-fs-dev
            </a>
          </p>
          <p>
            &gt; LINKEDIN:{" "}
            <a
              href="https://www.linkedin.com/in/marcus-koch-dev"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverTick}
            >
              marcus-koch-dev
            </a>
          </p>
          <p aria-hidden="true">
            &gt; AWAITING INPUT<span className="globe-hero__cursor-blink">_</span>
          </p>
        </div>
      </div>

      <div className="globe-hero__stage" ref={stageRef}>
        <div className="globe-hero__stage-inner">
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          showGlobe={true}
          globeMaterial={globeMaterial}
          showAtmosphere={true}
          atmosphereColor={GLOBE_COLORS.stroke}
          atmosphereAltitude={0.25}
          backgroundColor="rgba(0,0,0,0)"
          polygonsData={countries}
          polygonCapColor={() => "rgba(0,0,0,0)"}
          polygonSideColor={() => "rgba(0,0,0,0)"}
          polygonStrokeColor={() => GLOBE_COLORS.coastline}
          polygonAltitude={0.0035}
          hexPolygonsData={countries}
          hexPolygonResolution={4}
          hexPolygonMargin={0.55}
          hexPolygonUseDots={true}
          hexPolygonColor={(feature) =>
            feature.properties?.ISO_A2 === "DE" ? GLOBE_COLORS.dotBright : GLOBE_COLORS.dot
          }
          hexPolygonAltitude={0.004}
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointLabel="label"
          pointColor={(d) => d.color}
          pointRadius={0.4}
          pointAltitude={0.01}
          htmlElementsData={[MARCUS_COORDS]}
          htmlLat="lat"
          htmlLng="lng"
          htmlElement={() => {
            const el = document.createElement("div");
            el.className = "globe-hero__avatar-marker";
            el.title = "HOME BASE: LINDAU, DE";
            const img = document.createElement("img");
            img.src = "/assets/me.webp";
            img.alt = "Marcus";
            el.appendChild(img);
            return el;
          }}
          arcsData={arcs}
          arcColor={() => "#ffcc66"}
          arcAltitude={(arc) => {
            const km = haversineDistanceKm(arc.startLat, arc.startLng, arc.endLat, arc.endLng);
            return Math.min(0.4, Math.max(0.15, km / 12000));
          }}
          arcStroke={0.6}
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={1500}
        />
        </div>

        {aboutOpen && (
          <div className="globe-hero__info-popup">
            <button
              type="button"
              className="globe-hero__info-popup-close"
              onClick={goHome}
              onMouseEnter={playHoverTick}
              aria-label="Close"
            >
              &times;
            </button>
            <p className="globe-hero__info-popup-location">{"// Lindau, Lake Constance"}</p>
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
              onMouseEnter={playHoverTick}
              aria-label="Close"
            >
              &times;
            </button>
            <p className="globe-hero__info-popup-location">
              {`// ${selectedCities}`}
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
