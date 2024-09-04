import "./app.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

function App({ routes }) {
  // const [darkTheme, setTheme] = useThemeSetter();
  // console.log(routes);
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <h1 hidden={true}>Web Developer Marcus Koch</h1>
      
      <Portfolio classicHeader={classicHeader} darkTheme={darkTheme} />
      <Testimonials classicHeader={classicHeader} darkTheme={darkTheme} /> */}
      <Footer routes={routes} />
    </div>
  );
}

export default App;
