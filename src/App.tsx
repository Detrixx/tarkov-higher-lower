import React from "react";
import "animate.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main } from "./components/main/main";

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}
export default App;
