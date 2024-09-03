import React from "react";
import ReactDOM from "react-dom/client";

// for rtl format comment out bootstrap.min.css and uncomment bootstrap.rtl.min.css
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.rtl.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import "./sass/stylesheet.scss";
// import "./index.scss";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { ThemesProvider } from "./context/ThemesContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About/About";
import Home from "./components/Home/Home";

const innerRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "about",
    element: <About />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App routes={innerRoutes.map((route) => route.path)} />,
    children: innerRoutes,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ThemesProvider> */}
    <RouterProvider router={router} />
    {/* <App /> */}
    {/* </ThemesProvider> */}
  </React.StrictMode>
);

reportWebVitals();
