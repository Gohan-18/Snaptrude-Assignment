import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { useContext, useState } from "react";
import NameSearchLocation from "./NameSearchLocation";
import { useNavigate } from "react-router-dom";
import html2Canvas from "html2canvas";
import { AppContext } from "../App";

export const MAPBOX_TOKEN = import.meta.env.VITE_MAP_TOKEN;

function MapBox() {

    const { long, lat, setLong, setLat } = useContext(AppContext);

    // console.log(long, lat)

//   const [long, setLong] = useState(77.216721);
//   const [lat, setLat] = useState(28.6448);
  const navigate = useNavigate();

  const [viewPort, setViewPort] = useState({
    latitude: lat,
    longitude: long,
    zoom: 10,
  });

//   console.log(long, lat);

  function handleMarker(e) {
    e.preventDefault();
    const { longi, lati } = e.target;
    // console.log(longi.value, lati.value);
    setLong(longi.value);
    setLat(lati.value);
  }

  async function handleScreenshot() {
    // alert("I am clicked!!");

    // html2Canvas(document.body).then(function(canvas) {
    //     // let a = document.createElement('a');
    //     // a.href = canvas.toDataURL('../assets/image/jpeg').replace('image/jpeg', 'image/octet-stream');
    //     // a.download = 'someFile.jpeg';
    //     // a.click();

    //     document.body.appendChild(canvas);
    // })

    // const image = await fetch(
    //   `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${long},${lat},10,0,0/1200x1200?access_token=${MAPBOX_TOKEN}`
    // )
    // .then((item) => {
    //     console.log(item)
    //     let a = document.createElement('a');
    //     a.href = item.url
    //     a.download = 'someFile.jpg';
    //     a.click();
    // }) 

    // const img = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${long},${lat},10,0,60/600x600?access_token=${MAPBOX_TOKEN}`

    // // console.log(image)

    // const blob = await image.blob();
    // const url = window.URL.createObjectURL(blob);
    // let a = document.createElement('a');
    // a.href = url
    // a.download = "MapImage"
    // // a.target = '_blank'
    // // console.log(a)
    // a.click();

    // a.onclick = () => {
    //     browser.downloads.showDefaultFolder();
    // }



    navigate('/babylon');
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
        <label style={{ fontSize: "15px", width: "100%", textAlign: "start" }}>
          Longitude
        </label>
        <input
          type="text"
          name="longi"
          placeholder="Longitude..."
          value={long}
          disabled
          style={{
            padding: "5px 10px 5px 0px",
            border: "none",
            borderBottom: "2px solid gray",
            width: "100%",
          }}
        />
        <label style={{ fontSize: "15px", width: "100%", textAlign: "start" }}>
          Latitude
        </label>
        <input
          type="text"
          name="lati"
          placeholder="Latitude..."
          value={lat}
          disabled
          style={{
            padding: "5px 10px 5px 0px",
            border: "none",
            borderBottom: "2px solid gray",
            width: "100%",
          }}
        />
        {/* <button type="submit">Go</button> */}
      </form>
      <Map
        {...viewPort}
        onMove={(evt) => setViewPort(evt.viewPort)}
        style={{ width: "100vw", height: "100vh", position: "relative" }}
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
        <button
          onClick={handleScreenshot}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "50px",
            padding: "5px 10px 5px 10px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Snapshot
        </button>
      </Map>
    </>
  );
}

export default MapBox;
