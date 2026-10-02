import { useEffect, useMemo, useRef } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { haversineDistanceKm } from "../../lib/geoDistance";
import { locationCenter, zoomAltitudeFor } from "../../lib/projectZoom";
import { projectsData } from "../../data/projectList";
import { PROJECT_LOCATIONS } from "./projectLocations";
import Impressum from "../Footer/Impressum.jsx";
import Datenschutz from "../Footer/Datenschutz.jsx";
import GlobeBackdrop from "./GlobeBackdrop.jsx";
import IntroPanel from "./IntroPanel.jsx";
import InfoPopup from "./InfoPopup.jsx";
import { useDestinationRouting } from "./hooks/useDestinationRouting";
import { useElementSize } from "./hooks/useElementSize";
import { useCountriesGeoJSON } from "./hooks/useCountriesGeoJSON";
import { useGlobeCamera } from "./hooks/useGlobeCamera";
import { useGlobeLights } from "./hooks/useGlobeLights";
import { useGeolocationTracking } from "./hooks/useGeolocationTracking";
import { useAudioBlips } from "./hooks/useAudioBlips";
import {
  MARCUS_COORDS,
  MARCUS_HTML_ELEMENTS,
  HOME_VIEW,
  DESTINATION_ZOOM_ALTITUDE,
  GLOBE_COLORS,
  ABOUT_TEXT,
} from "../../config/globeHeroConfig";
import "./globeHero.scss";

const globeMaterial = new THREE.MeshPhongMaterial({ color: GLOBE_COLORS.ocean });

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

  const legalOpen = destination === "impressum" || destination === "datenschutz";

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
            polygonCapColor={() => GLOBE_COLORS.land}
            polygonSideColor={() => GLOBE_COLORS.land}
            polygonStrokeColor={() => GLOBE_COLORS.coastline}
            polygonAltitude={0.0015}
            pointsData={points}
            pointLat="lat"
            pointLng="lng"
            pointLabel="label"
            pointColor={(d) => d.color}
            pointRadius={0.4}
            pointAltitude={0.01}
            htmlElementsData={MARCUS_HTML_ELEMENTS}
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
              avatarMarkerRef.current = el;
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
          <InfoPopup onClose={goHome} onCloseHover={playHoverTick}>
            <p className="globe-hero__info-popup-location">{"// Lindau, Lake Constance"}</p>
            <h2>About Me</h2>
            <p className="globe-hero__info-popup-body">{ABOUT_TEXT}</p>
          </InfoPopup>
        )}

        {selectedProject && (
          <InfoPopup onClose={goHome} onCloseHover={playHoverTick}>
            <p className="globe-hero__info-popup-location">{`// ${selectedCities}`}</p>
            <h2>{selectedProject.title}</h2>
            <p className="globe-hero__info-popup-meta">
              {selectedProject.client} — {selectedProject.industry}
            </p>
            <p className="globe-hero__info-popup-body">{selectedProject.projectInfo}</p>
          </InfoPopup>
        )}

        {legalOpen && (
          <InfoPopup
            className="globe-hero__info-popup--center"
            onClose={goHome}
            onCloseHover={playHoverTick}
            closeLabel="Back to home"
          >
            {destination === "impressum" ? <Impressum /> : <Datenschutz />}
          </InfoPopup>
        )}
      </div>
    </div>
  );
}
