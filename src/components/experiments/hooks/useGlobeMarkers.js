import { useMemo } from "react";
import { MARCUS_COORDS } from "../../../config/globeHeroConfig";

export function useGlobeMarkers(userPoint, selectedProject, selectedLocations) {
  const points = useMemo(
    () => [
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
    ],
    [userPoint, selectedLocations, selectedProject]
  );

  const arcs = useMemo(
    () =>
      userPoint
        ? [{ startLat: MARCUS_COORDS.lat, startLng: MARCUS_COORDS.lng, endLat: userPoint.lat, endLng: userPoint.lng }]
        : [],
    [userPoint]
  );

  return { points, arcs };
}
