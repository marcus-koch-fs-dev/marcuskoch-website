import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
const time = 6000;
import "./footer.scss";

const InterpolatedWave = () => {
  // Array of objects holding the paths for both yellow and black waves
  // "M0 4.97397C0 4.97397 618.5 122.801 413 41.4672C207.5 -39.8667 840.5 18.0475 1079.5 59.6399C1318.5 101.232 1440 25.5667 1440 25.5667V136.858H0V4.97397Z",
  const wavePaths = [
    // {
    //   yellow:
    //     "M0 45.3254C76.9956 62.3742 472 116.906 331 60.7031C190 4.5 885.159 57.1505 1108.5 76C1448.67 104.71 1438.6 0 1438.6 0V168.92H0V45.3254Z",
    //   black:
    //     "M0 81.9546C0 81.9546 579.499 141.099 442.5 95.5462C305.5 49.9931 1168 150.943 1305 113.338C1442 75.733 1440 95.5462 1440 95.5462V169H0V81.9546Z",
    // },
    {
      yellow: `M0 45.3254C76.9956 62.3742 472 116.906 331 60.7031C190 4.5 885.159 57.1505 1108.5 76C1448.67 104.71 ${window.innerWidth} 169 ${window.innerWidth} 169V169H0V169Z`,
      black: `M0 81.9546C0 81.9546 579.499 141.099 442.5 95.5462C305.5 49.9931 1168 150.943 1305 113.338C1442 75.733 ${window.innerWidth} 169 ${window.innerWidth} 169V169H0V169Z`,
    },

    {
      yellow: `M0 0.654541C96.5 64 154.554 118.718 321.5 110C598.5 27.654 1333 -37.0004 1186 46.5C1039 130 ${window.innerWidth} 19.3006 ${window.innerWidth} 19.3006V183H0V0.654541Z`,
      black: `M0 50.8339C0 50.8339 197.192 160.449 378.868 121.218C560.545 81.9863 1265.73 -20.9833 1096.07 71.4267C926.4 163.837 ${window.innerWidth} 71.4266 ${window.innerWidth} 71.4266V182.717H0V50.8339Z`,
    },
  ];

  const [index, setIndex] = useState(0);

  // Cycle through the paths every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % wavePaths.length);
    }, time);

    return () => clearInterval(interval);
  }, [wavePaths.length]);

  // Trigger the animation immediately
  useEffect(() => {
    setIndex(1);
  }, []);

  // Interpolating the SVG paths based on the current index
  const yellowWaveProps = useSpring({
    d: wavePaths[index].yellow,
    config: { duration: time },
  });

  const blackWaveProps = useSpring({
    d: wavePaths[index].black,
    config: { duration: time },
  });
  // console.log(window.innerWidth);
  return (
    <div className="wave-simulation">
      <svg
        // width="1440"
        width={window.innerWidth}
        height="100"
        viewBox={`0 0 ${window.innerWidth} 100`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <animated.path d={yellowWaveProps.d} fill="#F4D115" />
        <animated.path d={blackWaveProps.d} fill="black" />
      </svg>
    </div>
  );
};

export default InterpolatedWave;
