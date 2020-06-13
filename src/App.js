import React, { useState, useEffect } from 'react';

import ReactMapGL from 'react-map-gl';

import './App.css';

function App() {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 1,
    height: "100vh",
    width: "100vw",


  })

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewport => setViewport(viewport)}
        mapStyle="mapbox://styles/vijaygenius123/ckbduwuqw2k9v1irnr4p9evtu"
      >

      </ReactMapGL>

    </div>
  );
}

export default App;
