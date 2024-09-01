import "./app.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Frame from "./components/Home/Frame";
import Home from "./components/Home/Home";

function App() {
  // const [darkTheme, setTheme] = useThemeSetter();

  return (
    <div className="app">
      <Header />
      <main>
        <Home />
      </main>
      {/* <h1 hidden={true}>Web Developer Marcus Koch</h1>
      <AboutUs classicHeader={classicHeader} darkTheme={darkTheme} />
      <Services classicHeader={classicHeader} darkTheme={darkTheme} />
      <Portfolio classicHeader={classicHeader} darkTheme={darkTheme} />
      <Testimonials classicHeader={classicHeader} darkTheme={darkTheme} /> */}
      <Footer />
    </div>
  );
}

export default App;
