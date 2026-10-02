import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { haversineDistanceKm } from "../../lib/geoDistance";
import Impressum from "../Footer/Impressum.jsx";
import Datenschutz from "../Footer/Datenschutz.jsx";
import InfoPopup from "./InfoPopup.jsx";
import { MARCUS_COORDS, MARCUS_HTML_ELEMENTS, GLOBE_COLORS, ABOUT_TEXT } from "../../config/globeHeroConfig";

const globeMaterial = new THREE.MeshPhongMaterial({ color: GLOBE_COLORS.ocean });
const polygonCapColor = () => GLOBE_COLORS.land;
const polygonSideColor = () => GLOBE_COLORS.land;
const polygonStrokeColor = () => GLOBE_COLORS.coastline;
const pointColor = (d) => d.color;
const arcColor = () => MARCUS_COORDS.color;
const arcAltitude = (arc) => {
  const km = haversineDistanceKm(arc.startLat, arc.startLng, arc.endLat, arc.endLng);
  return Math.min(0.4, Math.max(0.15, km / 12000));
};

export default function GlobeStage({
  stageRef,
  globeRef,
  size,
  countries,
  points,
  arcs,
  aboutOpen,
  selectedProject,
  selectedCities,
  legalOpen,
  destination,
  goHome,
  playHoverTick,
}) {
  const avatarMarkerRef = useRef(null);

  useEffect(() => {
    avatarMarkerRef.current?.classList.toggle("globe-hero__avatar-marker--large", aboutOpen);
  }, [aboutOpen]);

  return (
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
          polygonCapColor={polygonCapColor}
          polygonSideColor={polygonSideColor}
          polygonStrokeColor={polygonStrokeColor}
          polygonAltitude={0.0015}
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointLabel="label"
          pointColor={pointColor}
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
          arcColor={arcColor}
          arcAltitude={arcAltitude}
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
  );
}
