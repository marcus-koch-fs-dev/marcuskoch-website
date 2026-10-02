import { useEffect, useState } from "react";
import { destinationFromPath } from "../lib/destination";

const DESTINATION_TITLES = {
  impressum: "Impressum | Marcus Koch",
  datenschutz: "Datenschutz | Marcus Koch",
};
const DEFAULT_TITLE = "Marcus Koch | Fullstack Developer";

// "home" | "about" | "impressum" | "datenschutz" | a project id, synced to
// the real URL (see Footer.astro's click-interception script) so legal
// pages work without remounting the globe.
export function useDestinationRouting() {
  const [destination, setDestination] = useState(() => destinationFromPath(window.location.pathname));

  useEffect(() => {
    function onDestinationEvent(e) {
      setDestination(e.detail);
    }
    function onPopState() {
      setDestination(destinationFromPath(window.location.pathname));
    }
    window.addEventListener("globe-hero:destination", onDestinationEvent);
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("globe-hero:destination", onDestinationEvent);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    document.title = DESTINATION_TITLES[destination] ?? DEFAULT_TITLE;
  }, [destination]);

  return [destination, setDestination];
}
