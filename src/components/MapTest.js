import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

// console.log(MAPBOX_TOKEN);
const MapTest = () => {
  const [viewport, setViewport] = React.useState({
    width: "100%",
    height: "400px",
    latitude: 40.7484, // Example latitude
    longitude: -73.9857, // Example longitude
    zoom: 10, // Example zoom level
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {/* Marker for the specific position */}
      <Marker
        latitude={40.7484} // Latitude of the specific position
        longitude={-73.9857} // Longitude of the specific position
        offsetLeft={-20}
        offsetTop={-10}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "red",
            borderRadius: "50%",
          }}
        ></div>
      </Marker>
    </ReactMapGL>
  );
};

export default MapTest;
