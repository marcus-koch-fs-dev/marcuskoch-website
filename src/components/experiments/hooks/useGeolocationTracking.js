import { useEffect, useRef, useState } from "react";
import { haversineDistanceKm, estimateTravelStats, locationQualityFor } from "../../../lib/geoDistance";
import { LOCATION_WATCH_TIMEOUT_MS } from "../../../config/globeHeroConfig";

export function useGeolocationTracking(homeCoords) {
  const watchIdRef = useRef(null);
  const [permissionState, setPermissionState] = useState("idle");
  const [userPoint, setUserPoint] = useState(null);
  const [stats, setStats] = useState(null);
  const [locationQuality, setLocationQuality] = useState(null);

  useEffect(() => {
    return () => {
      if (watchIdRef.current != null) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, []);

  function requestLocation() {
    if (!navigator.geolocation) {
      setPermissionState("denied");
      return;
    }
    setPermissionState("requesting");
    if (watchIdRef.current != null) navigator.geolocation.clearWatch(watchIdRef.current);

    // Keep watching after the first fix: GPS accuracy improves over a few
    // seconds, so only better (lower-accuracy-number) readings replace the
    // shown one, until either a precise fix arrives or the timeout below
    // stops the watch.
    let bestAccuracy = Infinity;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        if (accuracy >= bestAccuracy) return;
        bestAccuracy = accuracy;
        setUserPoint({ lat: latitude, lng: longitude, label: "You", color: "#4dd2ff" });
        const distanceKm = haversineDistanceKm(latitude, longitude, homeCoords.lat, homeCoords.lng);
        const quality = locationQualityFor(accuracy);
        setStats(estimateTravelStats(distanceKm));
        setLocationQuality(quality);
        setPermissionState("granted");
        if (quality === "PRECISE") navigator.geolocation.clearWatch(watchId);
      },
      () => {
        // A later error (e.g. signal lost while refining) shouldn't erase
        // an already-shown reading -- only fail the request if we never
        // got one at all.
        setPermissionState((current) => (current === "granted" ? current : "denied"));
      },
      { enableHighAccuracy: true, maximumAge: 0 }
    );
    watchIdRef.current = watchId;
    setTimeout(() => navigator.geolocation.clearWatch(watchId), LOCATION_WATCH_TIMEOUT_MS);
  }

  return { permissionState, userPoint, stats, locationQuality, requestLocation };
}
