import React, { useState, useEffect } from "react";

const useResponsiveSize = () => {
  // Definiere Breakpoints für die Bildschirmgrößen
  const breakpoints = { sm: 600, med: 1200, lg: 2400 };

  const getDisplaySize = (width) => {
    switch (true) {
      case width <= breakpoints.sm:
        return "sm"; // Sehr kleine Displays
      case width > breakpoints.sm && width <= breakpoints.med:
        return "md"; // Kleine Displays
      case width > breakpoints.med:
        return "lg"; // Mittelgroße Displays
      default:
        return "md"; // Große Displays
    }
  };

  const [displaySize, setDisplaySize] = useState(() =>
    getDisplaySize(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setDisplaySize(getDisplaySize(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    // Cleanup-Funktion, um den Event Listener zu entfernen
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return displaySize;
};

export default useResponsiveSize;
