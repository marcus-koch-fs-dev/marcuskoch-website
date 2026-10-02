// src/lib/destination.js
import { projectsData } from "../data/projectList";
import { PROJECT_LOCATIONS } from "../data/projectLocations";

export function destinationFromPath(pathname) {
  if (pathname.startsWith("/impressum")) return "impressum";
  if (pathname.startsWith("/datenschutz")) return "datenschutz";
  return "home";
}

// "home" | "about" | "impressum" | "datenschutz" | a project id -> everything
// the UI needs to know about what's currently on screen.
export function describeDestination(destination) {
  const selectedProject =
    typeof destination === "number" ? projectsData.find((p) => p.id === destination) ?? null : null;
  const selectedLocations = selectedProject ? PROJECT_LOCATIONS[selectedProject.id] : null;
  const selectedCities = selectedLocations?.map((loc) => loc.city).join(" / ") ?? "UNKNOWN_LOCATION";
  const aboutOpen = destination === "about";
  const legalOpen = destination === "impressum" || destination === "datenschutz";
  const destinationLabel = aboutOpen
    ? "ABOUT_ME — LINDAU, DE"
    : selectedProject
    ? `${selectedProject.title.toUpperCase()} — ${selectedCities.toUpperCase()}`
    : "HOME BASE";

  return { selectedProject, selectedLocations, selectedCities, aboutOpen, legalOpen, destinationLabel };
}
