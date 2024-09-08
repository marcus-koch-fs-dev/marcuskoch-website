import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import { useThemeSetter } from "./hooks/useThemeSetter";

function App() {
  const [theme] = useThemeSetter();

  return (
    <div className={`app ${theme}`}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
