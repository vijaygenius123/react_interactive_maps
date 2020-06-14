import React, { useState, useEffect } from 'react';

import ReactMapGL, { Marker, Popup } from 'react-map-gl';

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
  const [earthquake, setEarthquake] = useState(null)

  useEffect(() => {

    const escapeListener = e => {
      if (e.key === "Escape") {
        setEarthquake(null)
      }
    }
    async function fetchData() {
      const response = await fetch(API_URL);
      const json = await response.json();
      console.log(json.features)
      setGeojsonData(json['features'])
    }

    fetchData()
    window.addEventListener('keyup', escapeListener)

    return () => {
      window.removeEventListener('keyup', escapeListener)
    }
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
            <img
              className="marker"
              onClick={() => setEarthquake(obj)}
              alt={obj.properties.title}
              src="https://storage.needpix.com/rsynced_images/google-309740_1280.png">
            </img>
          </Marker>)}
        {earthquake ? (
          <Popup
            longitude={earthquake.geometry.coordinates[0]}
            latitude={earthquake.geometry.coordinates[1]}
            onClose={() => setEarthquake(null)}>
            <div>
              {earthquake.properties.title}
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>

    </div>
  );
}

export default App;
