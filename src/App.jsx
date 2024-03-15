import "./App.scss";
import Home from "./components/Home/Home";
import AboutUs from "./components/About/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio/Portfolio";
import Testimonials from "./components/Testimonials/Testimonials";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import { commonConfig } from "./config/commonConfig";
import TermsAndConditions from "./components/Footer/TermsAndConditions";
import Disclaimer from "./components/Footer/Disclaimer";
import PreLoader from "./components/Preloader";
import TooltipWrapper from "./components/Tooltip/TooltipWrapper";
import HeaderWrapper from "./components/Header/HeaderWrapper";

function App() {
  const classicHeader = commonConfig.classicHeader;
  const darkTheme = commonConfig.darkTheme;

  const handleNavClick = (section) => {
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setisLoading(false);
    }, 1000);
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
    <>
      <div
        style={{ position: "relative" }}
        className={classicHeader ? "" : "side-header"}
      >
        {isLoading && <PreLoader />}
        <div id="main-wrapper">
          <HeaderWrapper
            classicHeader={classicHeader}
            handleNavClick={handleNavClick}
          />
          <div id="content" role="main">
            <Home
              classicHeader={classicHeader}
              darkTheme={darkTheme}
              handleNavClick={handleNavClick}
            />
            <AboutUs classicHeader={classicHeader} darkTheme={darkTheme} />
            <Services classicHeader={classicHeader} darkTheme={darkTheme} />
            {/* <Resume classicHeader={classicHeader} darkTheme={darkTheme} /> */}
            <Portfolio classicHeader={classicHeader} darkTheme={darkTheme} />
            <Testimonials classicHeader={classicHeader} darkTheme={darkTheme} />
            <Contact classicHeader={classicHeader} darkTheme={darkTheme} />
          </div>
          <Footer
            classicHeader={classicHeader}
            darkTheme={darkTheme}
            handleNavClick={handleNavClick}
          />
        </div>
        {/* back to top */}
        <TooltipWrapper
          label={"Zum Seitenanfang"}
          scrollTopVisible={scrollTopVisible}
        />
        <TermsAndConditions darkTheme={darkTheme} />
        <Disclaimer darkTheme={darkTheme} />
      </div>
    </>
  );
}

export default App;
