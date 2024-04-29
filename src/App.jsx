import "./App.scss";
import Home from "./components/Home/Home";
import AboutUs from "./components/About/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio/Portfolio";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import { commonConfig } from "./config/commonConfig";
import PreLoader from "./components/Preloader";
import TooltipWrapper from "./components/Tooltip/TooltipWrapper";
import useThemeSetter, { ThemeContext } from "./context/themeContext";

import Header from "./components/Header/Header";

function App() {
  const classicHeader = commonConfig.classicHeader;
  // const darkTheme = commonConfig.darkTheme;
  const [darkTheme, setTheme] = useThemeSetter();

  const handleNavClick = (section) => {
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setisLoading(false);
    }, 500);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const checkScrollTop = () => {
    let scrollTopBtn = document.getElementById("back-to-top");

    if (scrollTopBtn) {
      if (
        document.body.scrollTop > 400 ||
        document.documentElement.scrollTop > 400
      ) {
        setScrollTopVisible(true);
      } else {
        setScrollTopVisible(false);
      }
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", checkScrollTop);
  }

  return (
    <ThemeContext.Provider value={{ darkTheme, setTheme }}>
      <main style={{ position: "relative" }}>
        {isLoading && <PreLoader />}
        <section id="main-wrapper">
          <Header />
          <h1 hidden={true}>Web Developer Marcus Koch</h1>
          <Home handleNavClick={handleNavClick} />
          <AboutUs classicHeader={classicHeader} darkTheme={darkTheme} />
          <Services classicHeader={classicHeader} darkTheme={darkTheme} />
          <Portfolio classicHeader={classicHeader} darkTheme={darkTheme} />
          <Testimonials classicHeader={classicHeader} darkTheme={darkTheme} />
          <Footer classicHeader={classicHeader} darkTheme={darkTheme} />
        </section>
        <TooltipWrapper
          label={"Zum Seitenanfang"}
          scrollTopVisible={scrollTopVisible}
          darkTheme={darkTheme}
        />
      </main>
    </ThemeContext.Provider>
  );
}

export default App;
