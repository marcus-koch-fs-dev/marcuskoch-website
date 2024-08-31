import "./header.scss";
import { useEffect, useState, useMemo, useContext } from "react";
import Navbar from "./Navbar";

const Header = () => {
  const [stickyHeader, setStickyHeader] = useState(false);
  const [isNavModalClose, setIsNavModalClose] = useState(true);
  // const { darkTheme, setTheme } = useContext(ThemeContext);

  // useEffect(() => {
  //   // Check scroll position to toggle sticky header
  //   const checkScrollTop = () => {
  //     setStickyHeader(window.scrollY > 180);
  //   };

  //   window.addEventListener("scroll", checkScrollTop);
  //   return () => window.removeEventListener("scroll", checkScrollTop);
  // }, []);

  // useEffect(() => {
  //   // Ensure the window scrolls to the top on initial load
  //   scroller.scrollTo("home", {
  //     duration: 500,
  //     delay: 100,
  //     smooth: true,
  //     offset: -50, // Adjust according to your needs for correct positioning
  //   });
  // }, []);

  const isMobile = false;

  return (
    <header>
      <Navbar />
    </header>
  );
};

export default Header;
