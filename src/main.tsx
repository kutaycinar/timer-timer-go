import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@picocss/pico";
import "./index.css";
import StateProvider from "./StateProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <StateProvider>
    <App />
  </StateProvider>
  // </React.StrictMode>,
);
