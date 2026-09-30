const EARTH_RADIUS_KM = 6371;
const CAR_KMH = 90;
const WALK_KMH = 5;
const PLANE_KMH = 800;
const PLANE_OVERHEAD_MINUTES = 90;
const CALL_BASE_MS = 20;
const CALL_KM_PER_MS = 40;

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

export function haversineDistanceKm(lat1, lon1, lat2, lon2) {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

export function estimateTravelStats(distanceKm) {
  return {
    distanceKm: Math.round(distanceKm),
    carMinutes: Math.round((distanceKm / CAR_KMH) * 60),
    walkMinutes: Math.round((distanceKm / WALK_KMH) * 60),
    planeMinutes: Math.round((distanceKm / PLANE_KMH) * 60 + PLANE_OVERHEAD_MINUTES),
    callMs: Math.round(CALL_BASE_MS + distanceKm / CALL_KM_PER_MS),
  };
}
