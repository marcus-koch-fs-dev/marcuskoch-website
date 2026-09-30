// src/lib/theme.js
export const THEMES = [
  { angle: "0", class: "fa-regular fa-sun", delay: 1750, theme: "sunrise", svg: "#bbe1fa" },
  { angle: "90", class: "fa-solid fa-sun", delay: 1750, theme: "day", svg: "#6d94c5" },
  { angle: "180", class: "fa-regular fa-moon", delay: 1750, theme: "sundown", svg: "#E7D283" },
  { angle: "270", class: "fa-solid fa-moon", delay: 1750, theme: "night", svg: "#535C91" },
];

export const DEFAULT_THEME = "day";

export function resolveInitialTheme(raw) {
  if (!raw) return DEFAULT_THEME;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return DEFAULT_THEME;
  }
  return THEMES.some((zone) => zone.theme === parsed) ? parsed : DEFAULT_THEME;
}

export function applyTheme(themeName) {
  document.documentElement.className = themeName;
  localStorage.setItem("theme", JSON.stringify(themeName));
}
