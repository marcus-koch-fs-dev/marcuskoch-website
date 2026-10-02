import { useEffect, useRef } from "react";
import { locationCenter, zoomAltitudeFor } from "../../lib/projectZoom";
import { describeDestination } from "../../lib/destination";
import { PROJECT_LOCATIONS } from "../../data/projectLocations";
import GlobeBackdrop from "./GlobeBackdrop.jsx";
import IntroPanel from "./IntroPanel.jsx";
import GlobeStage from "./GlobeStage.jsx";
import { useDestinationRouting } from "../../hooks/useDestinationRouting";
import { useElementSize } from "../../hooks/useElementSize";
import { useCountriesGeoJSON } from "../../hooks/useCountriesGeoJSON";
import { useGlobeCamera } from "../../hooks/useGlobeCamera";
import { useGlobeLights } from "../../hooks/useGlobeLights";
import { useGeolocationTracking } from "../../hooks/useGeolocationTracking";
import { useAudioBlips } from "../../hooks/useAudioBlips";
import { useGlobeMarkers } from "../../hooks/useGlobeMarkers";
import { MARCUS_COORDS, HOME_VIEW, DESTINATION_ZOOM_ALTITUDE } from "../../config/globeHeroConfig";
import "./globeHero.scss";

export default function GlobeHero() {
  const globeRef = useRef();
  const stageRef = useRef();
  const avatarMarkerRef = useRef(null);

  const [destination, setDestination] = useDestinationRouting();
  const size = useElementSize(stageRef);
  const countries = useCountriesGeoJSON();
  const { permissionState, userPoint, stats, locationQuality, requestLocation } =
    useGeolocationTracking(MARCUS_COORDS);
  const { playBlip, playHoverTick } = useAudioBlips();

  useGlobeCamera(globeRef, destination === "home");
  useGlobeLights(globeRef);

  useEffect(() => {
    avatarMarkerRef.current?.classList.toggle("globe-hero__avatar-marker--large", destination === "about");
  }, [destination]);

  function goHome() {
    playBlip();
    if (window.location.pathname !== "/") history.pushState({}, "", "/");
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
      globeRef.current?.pointOfView({ ...locationCenter(locations), altitude: zoomAltitudeFor(locations) }, 1200);
    }
  }

  const { selectedProject, selectedCities, aboutOpen, legalOpen, destinationLabel, selectedLocations } =
    describeDestination(destination);
  const { points, arcs } = useGlobeMarkers(userPoint, selectedProject, selectedLocations);

  return (
    <div className={`globe-hero${legalOpen ? " globe-hero--legal" : ""}`}>
      <GlobeBackdrop />

      <IntroPanel
        stats={stats}
        locationQuality={locationQuality}
        permissionState={permissionState}
        requestLocation={requestLocation}
        playBlip={playBlip}
        playHoverTick={playHoverTick}
        destination={destination}
        destinationLabel={destinationLabel}
        aboutOpen={aboutOpen}
        goHome={goHome}
        goAbout={goAbout}
        selectProject={selectProject}
      />

      <GlobeStage
        stageRef={stageRef}
        globeRef={globeRef}
        avatarMarkerRef={avatarMarkerRef}
        size={size}
        countries={countries}
        points={points}
        arcs={arcs}
        aboutOpen={aboutOpen}
        selectedProject={selectedProject}
        selectedCities={selectedCities}
        legalOpen={legalOpen}
        destination={destination}
        goHome={goHome}
        playHoverTick={playHoverTick}
      />
    </div>
  );
}
