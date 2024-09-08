import React, { useState, useEffect } from "react";

const useResponsiveSize = () => {
  const breakpoints = {
    tablet: 768,
  };

  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= breakpoints.tablet
  );
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWidth(currentWidth);
      setIsMobile(currentWidth <= breakpoints.tablet); // Setzt isMobile auf true, wenn die Breite <= tablet-Breite ist
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile, width };
};

export default useResponsiveSize;
