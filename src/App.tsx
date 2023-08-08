import React from "react";
import "animate.css";
import "./App.css";
import { Main } from "./components/main/main";
import { Leaderboard } from "./components/leaderboard/leaderboard";
import{BrowserRouter as Router, Routes, Route} from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/leaderboard" element={<Leaderboard />}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
