import "./App.css";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import { useState } from "react";

function App() {
  // mapboxgl.accessToken =
  //   "pk.eyJ1IjoicHJhYi1oYXQxOCIsImEiOiJjbGZiNjVuaGQyeGxnM29yMDU3MGQzaGVhIn0.8eObBAjrqScgVVrmE-pbOQ";
  // const map = new mapboxgl.Map({
  //   container: "map", // container ID
  //   style: "mapbox://styles/mapbox/streets-v12", // style URL
  //   center: [-74.5, 40], // starting position [lng, lat]
  //   zoom: 10, // starting zoom
  // });

  // const [viewPort, setViewPort] = useState({
  //   longitude: -100,
  //   latitude: 40,
  //   zoom: 10,
  //   width: "100vw",
  //   height: "100vh"
  // })

  const lat = 28.644800
  const long = 77.216721

  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoicHJhYi1oYXQxOCIsImEiOiJjbGZiNjVuaGQyeGxnM29yMDU3MGQzaGVhIn0.8eObBAjrqScgVVrmE-pbOQ"
      initialViewState={{
        longitude: long,
        latitude: lat,
        zoom: 10
      }}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={long} latitude={lat} />
      <NavigationControl position="bottom-right" />
      <GeolocateControl/>
      <FullscreenControl/>
    </Map>
  );
}

export default App;
