// src/config/globeHeroConfig.js
// Central data for the GlobeHero experience -- coordinates, camera, text
// content and timing. Component/hook files hold behavior; this file holds
// the numbers and strings that behavior reads.

// Real location, given by Marcus for this feature.
export const MARCUS_COORDS = { lat: 47.5456, lng: 9.6857, label: "Marcus", color: "#ffcc66" };
// Stable reference so react-globe.gl's htmlElementsData prop doesn't see a
// "changed" array on every unrelated re-render.
export const MARCUS_HTML_ELEMENTS = [MARCUS_COORDS];

export const HOME_VIEW = { lat: 15, lng: 25, altitude: 1.7 };
export const DESTINATION_ZOOM_ALTITUDE = 0.35;

export const GLOBE_COLORS = {
  ocean: "#000000",
  // Solid land fill, a shade lighter than the ocean so coastlines read
  // without relying on the stroke alone.
  land: "#0b1a12",
  stroke: "#3dffa0",
  // Green country outline -- three-globe's polygon stroke has no
  // line-width control, so "thin" is opacity + altitude.
  coastline: "rgba(61, 255, 160, 0.16)",
};

export const THEME_LIGHT = {
  sunrise: { color: 0xffd9a0, position: [-3, 0.4, 1.5], ambient: 0.6 },
  day: { color: 0xffffff, position: [1, 3, 2], ambient: 0.6 },
  sundown: { color: 0xff9955, position: [3, 0.3, -1.5], ambient: 0.5 },
  night: { color: 0x8899ff, position: [0, -1, 2], ambient: 0.25 },
};

export const ABOUT_TEXT =
  "I'm Marcus Koch, a fullstack developer with 5+ years of experience in TypeScript, React and Node.js. My focus is on web performance and scalable software architecture. I built a cloud-based tracking system at Thyssenkrupp that reduced the manual search for defective components from days to seconds and helped avoid expensive compensation cases.";

// Condensed from the real About page's tech-badges list.
export const TECH_STACK_GROUPS = [
  { label: "Frontend", items: ["TypeScript", "React", "Next.js"] },
  { label: "Backend", items: ["Node.js", "Python", "GraphQL"] },
  { label: "Infra", items: ["PostgreSQL", "MongoDB", "Redis", "AWS", "Docker", "Jest // Cypress"] },
];

export const PENDING_RANGE = "AWAITING COORDS";
export const PENDING_SHORT = "···";

export const TWINKLE_STAR_COLORS = ["#ffffff", "#ffe1b3", "#ff9e80", "#9fdcff"];
export const TWINKLE_STAR_COUNT = 55;
export const TWINKLE_STAR_SEED = 42;

export const LOCATION_WATCH_TIMEOUT_MS = 10000;
export const NAME_SCAN_INTERVAL_MS = 10000;
export const NAME_SWEEP_STAGGER_MS = 90;
export const NAME_SWEEP_HOLD_MS = 300;
