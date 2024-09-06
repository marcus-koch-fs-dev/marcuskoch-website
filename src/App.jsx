import "./app.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

function App() {
  // const [darkTheme, setTheme] = useThemeSetter();
  // console.log(routes);
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <h1 hidden={true}>Web Developer Marcus Koch</h1>
      
      <Projects classicHeader={classicHeader} darkTheme={darkTheme} />
      <Testimonials classicHeader={classicHeader} darkTheme={darkTheme} /> */}
      <Footer />
    </div>
  );
}

export default App;
