import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Router from "@/routers/index";
import { HashRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Router />
    </HashRouter>
  );
}

export default App;
