// src/lib/projectZoom.js
import { haversineDistanceKm } from "./geoDistance";
import { DESTINATION_ZOOM_ALTITUDE } from "../config/globeHeroConfig";

// A project can span more than one location (see project 7). These stay
// pure/standalone so the zoom math is easy to reason about in isolation.
export function locationCenter(locations) {
  const lat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
  const lng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;
  return { lat, lng };
}

export function zoomAltitudeFor(locations) {
  if (locations.length < 2) return DESTINATION_ZOOM_ALTITUDE;
  const [a, b] = locations;
  const spanKm = haversineDistanceKm(a.lat, a.lng, b.lat, b.lng);
  return Math.max(DESTINATION_ZOOM_ALTITUDE, Math.min(0.8, spanKm / 300));
}
