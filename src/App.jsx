import "./app.scss";
import Header from "./components/Header/Header";

function App() {
  // const [darkTheme, setTheme] = useThemeSetter();

  return (
    <div className="main">
      <Header />
      <h1>Hello World</h1>
      {/* <h1 hidden={true}>Web Developer Marcus Koch</h1>
      <Home handleNavClick={handleNavClick} />
      <AboutUs classicHeader={classicHeader} darkTheme={darkTheme} />
      <Services classicHeader={classicHeader} darkTheme={darkTheme} />
      <Portfolio classicHeader={classicHeader} darkTheme={darkTheme} />
      <Testimonials classicHeader={classicHeader} darkTheme={darkTheme} /> */}
      {/* <Footer classicHeader={classicHeader} darkTheme={darkTheme} /> */}
    </div>
  );
}

export default App;
