import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarChart from "./Component/BarChart";

function App() {
  return (
    <div className="App">
      <h1>Actors Awards Graphs</h1>
      <div>
          <div className =" ui container">
            <BarChart/>
          </div>
          <br/>
      </div>
    </div>
  );
}

export default App;
