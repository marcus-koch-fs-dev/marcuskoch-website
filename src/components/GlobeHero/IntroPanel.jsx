import { useEffect } from "react";
import GlowText from "./GlowText.jsx";
import TerminalNav from "./TerminalNav.jsx";
import { formatDuration } from "../../lib/geoDistance";
import {
  PENDING_RANGE,
  PENDING_SHORT,
  NAME_SCAN_INTERVAL_MS,
  NAME_SWEEP_STAGGER_MS,
  NAME_SWEEP_HOLD_MS,
} from "../../config/globeHeroConfig";

export default function IntroPanel({
  stats,
  locationQuality,
  permissionState,
  requestLocation,
  playBlip,
  playHoverTick,
  destination,
  destinationLabel,
  aboutOpen,
  goHome,
  goAbout,
  selectProject,
}) {
  useEffect(() => {
    function sweepNameGlow() {
      const letters = document.querySelectorAll(".globe-hero__name .globe-hero__word span");
      letters.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add("glow-pulse");
          setTimeout(() => el.classList.remove("glow-pulse"), NAME_SWEEP_HOLD_MS);
        }, i * NAME_SWEEP_STAGGER_MS);
      });
    }
    const introTimer = setTimeout(sweepNameGlow, 3000);
    const interval = setInterval(sweepNameGlow, NAME_SCAN_INTERVAL_MS);
    return () => {
      clearTimeout(introTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="globe-hero__intro">
      <p className="globe-hero__eyebrow">
        <GlowText text="Fullstack Developer" />
      </p>
      <h1 className="globe-hero__name">
        <GlowText text="Marcus Koch" />
      </h1>
      <p className="globe-hero__tagline">TypeScript · React · Node.js — based in Lindau, DE</p>

      <div className="globe-hero__terminal">
        <p className="globe-hero__terminal-title">MU/TH/UR 6000</p>

        <div className="globe-hero__terminal-body">
          <div className="globe-hero__terminal-readout">
            <div className="globe-hero__intel">
              <p className="globe-hero__intel-title">NAV: ROUTE TO HOME BASE</p>
              <ul className="globe-hero__stats">
                <li>
                  <span>Range</span>
                  <span className="globe-hero__stats-leader" />
                  <span>
                    {stats
                      ? `${locationQuality === "PRECISE" ? "" : "~"}${stats.distanceKm} km (${locationQuality})`
                      : PENDING_RANGE}
                  </span>
                </li>
                <li>
                  <span>Ground transport</span>
                  <span className="globe-hero__stats-leader" />
                  <span>{stats ? formatDuration(stats.carMinutes) : PENDING_SHORT}</span>
                </li>
                <li>
                  <span>EVA (on foot)</span>
                  <span className="globe-hero__stats-leader" />
                  <span>{stats ? formatDuration(stats.walkMinutes) : PENDING_SHORT}</span>
                </li>
                <li>
                  <span>Airborne</span>
                  <span className="globe-hero__stats-leader" />
                  <span>{stats ? `${formatDuration(stats.planeMinutes)} (incl. security)` : PENDING_SHORT}</span>
                </li>
                <li>
                  <span>Transmission</span>
                  <span className="globe-hero__stats-leader" />
                  <span>
                    INSTANT{" "}
                    <a
                      className="globe-hero__stats-send"
                      href="mailto:marcus@marcus-koch.dev?subject=Request&body=Hi%20Marcus,"
                      onMouseEnter={playHoverTick}
                    >
                      [ SEND &gt; ]
                    </a>
                  </span>
                </li>
              </ul>
              {permissionState !== "granted" && (
                <p className="globe-hero__terminal-hint">
                  {permissionState === "denied" ? (
                    "Location access denied — range unknown."
                  ) : (
                    <>
                      Allow location for exact range.{" "}
                      <button
                        type="button"
                        onClick={requestLocation}
                        onMouseEnter={playHoverTick}
                        disabled={permissionState === "requesting"}
                      >
                        {permissionState === "requesting" ? "[ ACQUIRING… ]" : "[ ACQUIRE POSITION ]"}
                      </button>
                    </>
                  )}
                </p>
              )}
            </div>
          </div>

          <TerminalNav
            destination={destination}
            destinationLabel={destinationLabel}
            aboutOpen={aboutOpen}
            goHome={goHome}
            goAbout={goAbout}
            selectProject={selectProject}
            playBlip={playBlip}
            playHoverTick={playHoverTick}
          />
        </div>
      </div>

      <div className="globe-hero__status-log">
        <p aria-hidden="true">&gt; STATUS: NOMINAL</p>
        <p>
          &gt; GITHUB:{" "}
          <a href="https://github.com/marcus-koch-fs-dev" target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverTick}>
            marcus-koch-fs-dev
          </a>
        </p>
        <p>
          &gt; LINKEDIN:{" "}
          <a href="https://www.linkedin.com/in/marcus-koch-dev" target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverTick}>
            marcus-koch-dev
          </a>
        </p>
        <p aria-hidden="true">
          &gt; AWAITING INPUT<span className="globe-hero__cursor-blink">_</span>
        </p>
      </div>
    </div>
  );
}
