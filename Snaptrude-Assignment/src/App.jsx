import "./App.css";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { useState } from "react";
import NameSearchLocation from "./NameSearchLocation";

// const MAPBOX_TOKEN ="pk.eyJ1IjoicHJhYi1oYXQxOCIsImEiOiJjbGZiNjVuaGQyeGxnM29yMDU3MGQzaGVhIn0.8eObBAjrqScgVVrmE-pbOQ";
const MAPBOX_TOKEN = import.meta.env.VITE_MAP_TOKEN;



function App() {
  
  const [long, setLong] = useState(77.216721);
  const [lat, setLat] = useState(28.6448);

  const [viewPort, setViewPort] = useState({
    latitude: lat,
    longitude: long,
    zoom: 10,
  });

  console.log(long, lat);

  function handleMarker(e) {
    e.preventDefault();
    const { longi, lati } = e.target;
    console.log(longi.value, lati.value);
    setLong(longi.value);
    setLat(lati.value);
  }

  return (
    <>
      <form
        onSubmit={(e) => handleMarker(e)}
        style={{
          backgroundColor: "#ffffffae",
          zIndex: 50,
          position: "fixed",
          display: "flex",
          width: "300px",
          height: "200px",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          flexDirection: "column",
          top: "20px",
          left: "20px",
          borderRadius: "20px",
          padding: "40px",
        }}
      >
        <label style={{fontSize: '15px',width: '100%', textAlign: 'start'}} >Longitude</label>
        <input
          type="text"
          name="longi"
          placeholder="Longitude..."
          value={long}
          disabled
          style={{padding: '5px 10px 5px 0px', border: 'none', borderBottom: '2px solid gray', width:'100%'}}
        />
        <label style={{fontSize: '15px',width: '100%', textAlign: 'start'}}>Latitude</label>
        <input
          type="text"
          name="lati"
          placeholder="Latitude..."
          value={lat}
          disabled
          style={{padding: '5px 10px 5px 0px', border: 'none', borderBottom: '2px solid gray', width:'100%'}}
        />
        {/* <button type="submit">Go</button> */}
      </form>
      <Map
        {...viewPort}
        onMove={(evt) => setViewPort(evt.viewPort)}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker
          longitude={long}
          latitude={lat}
          draggable
          onDragEnd={(e) => {
            setLong(e.lngLat.lng);
            setLat(e.lngLat.lat);
          }}
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          trackUserLocation
          onGeolocate={(e) => {
            setLong(e.coords.longitude);
            setLat(e.coords.latitude);
          }}
        />
        <FullscreenControl />
        <NameSearchLocation long={setLong} lat={setLat} />
      </Map>
    </>
  );
}

export default App;
