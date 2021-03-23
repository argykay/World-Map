import React from "react";
import "./App.css";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import GeoMap from "./GeoMap";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="container">
          <p className="inner">
            <span id="one">World Map</span>
            <span id="two">World Map</span>
            <span id="three">World Map</span>
          </p>
        </div>
      </div>

      <ParentSize>
        {({ width, height }) => <GeoMap width={width} height={height} />}
      </ParentSize>
    </div>
  );
}

export default App;
