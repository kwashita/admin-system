import { useState } from "react";
import Router from "@/routers/index";
import { HashRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Router />
    </HashRouter>
  );
}
const mapStateToProps = (state: any) => state.global;

export default connect(mapStateToProps)(App);
