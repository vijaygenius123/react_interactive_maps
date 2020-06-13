import React, { useState, useEffect } from 'react';

import ReactMapGL, { Marker } from 'react-map-gl';

import './App.css';

const API_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'

function App() {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 1,
    height: "100vh",
    width: "100vw",
  })
  const [geojsonData, setGeojsonData] = useState([])
  useEffect(() => {

    async function fetchData() {
      const response = await fetch(API_URL);
      const json = await response.json();
      console.log(json.features)
      setGeojsonData(json['features'])
    }

    fetchData()

  }, [])

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewport => setViewport(viewport)}
        mapStyle="mapbox://styles/vijaygenius123/ckbduwuqw2k9v1irnr4p9evtu"
      >
        {geojsonData.map(obj =>
          <Marker key={obj.id}
            longitude={obj.geometry.coordinates[0]}
            latitude={obj.geometry.coordinates[1]}>
            <img className="marker" src="https://storage.needpix.com/rsynced_images/google-309740_1280.png">
            </img>
          </Marker>)}
      </ReactMapGL>

    </div>
  );
}

export default App;
