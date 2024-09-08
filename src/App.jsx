import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import { useThemeSetter } from "./hooks/useThemeSetter";
import { useEffect } from "react";

function App() {
  const [theme] = useThemeSetter();
  useEffect(() => {
    document.body.className = theme; // Setzt die Klasse auf das body-Element
  }, [theme]);
  return (
    // <div className={`app ${theme}`}>
    <div className={`app`}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
