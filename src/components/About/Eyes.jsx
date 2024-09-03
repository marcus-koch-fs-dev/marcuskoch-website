import { useEffect } from "react";
import { useState } from "react";

const Eyes = () => {
  const [eyesToggled, setEyesToggled] = useState(false);

  useEffect(() => {
    const times = [4000, 200]; // Zeit in Millisekunden, 150ms für das Blinzeln

    const blink = () => {
      setEyesToggled(true); // Auge schließen
      setTimeout(() => {
        setEyesToggled(false); // Auge öffnen
      }, times[1]);
    };

    const interval = setInterval(() => {
      blink();
    }, times[0]);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="eyes-simulation">
      <svg
        width="193"
        height="184"
        viewBox="0 0 193 184"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1.61816"
          y="82"
          width="100"
          height="100"
          rx="50"
          transform="rotate(0.927192 1.61816 82)"
          fill="#F4D115"
        />
        <rect
          x="30.9709"
          y="112"
          width="60"
          height="60"
          rx="30"
          transform="rotate(0.927192 30.9709 112)"
          fill="black"
        />
        <rect
          x="57.3236"
          y="135"
          width="25"
          height="25"
          rx="12.5"
          transform="rotate(0.927192 57.3236 135)"
          // fill="#FBC508"
          fill={eyesToggled ? "none " : "#FBC508"}
        />
        <rect
          x="92.6182"
          width="100"
          height="100"
          rx="50"
          transform="rotate(0.927192 92.6182 0)"
          fill="#F4D115"
        />
        <rect
          x="121.971"
          y="30"
          width="60"
          height="60"
          rx="30"
          transform="rotate(0.927192 121.971 30)"
          fill="black"
        />
        <rect
          x="148.324"
          y="53"
          width="25"
          height="25"
          rx="12.5"
          transform="rotate(0.927192 148.324 53)"
          fill={eyesToggled ? "none " : "#FBC508"}
        />
      </svg>
    </div>
  );
};

export default Eyes;
