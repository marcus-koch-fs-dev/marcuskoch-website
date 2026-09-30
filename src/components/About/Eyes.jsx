// src/components/About/Eyes.jsx
import { useEffect, useState } from "react";

const Eyes = () => {
  const [eyesToggled, setEyesToggled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let cancelled = false;
    const timeouts = [];
    const after = (fn, delay) => {
      const id = setTimeout(fn, delay);
      timeouts.push(id);
    };

    const blink = () => {
      setEyesToggled(true);
      after(() => {
        setEyesToggled(false);
        if (Math.random() < 0.15) {
          after(() => {
            setEyesToggled(true);
            after(() => setEyesToggled(false), 110);
          }, 140);
        }
      }, 120 + Math.random() * 100);
    };

    const loop = () => {
      after(() => {
        if (cancelled) return;
        blink();
        loop();
      }, 3000 + Math.random() * 4000);
    };
    loop();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="eyes-simulation">
      <svg width="193" height="184" viewBox="0 0 193 184" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.61816" y="82" width="100" height="100" rx="50" transform="rotate(0.927192 1.61816 82)" fill="var(--svg-fill)" />
        <rect x="30.9709" y="112" width="60" height="60" rx="30" transform="rotate(0.927192 30.9709 112)" fill="black" />
        <rect x="57.3236" y="135" width="25" height="25" rx="12.5" transform="rotate(0.927192 57.3236 135)" fill={eyesToggled ? "none" : "var(--svg-fill)"} />
        <rect x="92.6182" width="100" height="100" rx="50" transform="rotate(0.927192 92.6182 0)" fill="var(--svg-fill)" />
        <rect x="121.971" y="30" width="60" height="60" rx="30" transform="rotate(0.927192 121.971 30)" fill="black" />
        <rect x="148.324" y="53" width="25" height="25" rx="12.5" transform="rotate(0.927192 148.324 53)" fill={eyesToggled ? "none" : "var(--svg-fill)"} />
      </svg>
    </div>
  );
};

export default Eyes;
