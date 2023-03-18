import React, { useContext } from 'react';
import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useControl } from 'react-map-gl';
import { AppContext } from '../App';

const NameSearchLocation = () => {

  const { setLong, setLat } = useContext(AppContext);

    const geocoder = new MapBoxGeocoder({
        accessToken: import.meta.env.VITE_MAP_TOKEN,
        marker: false,
        collapsed: true
        // mapboxgl: mapboxgl
    })

    // console.log(long)

    useControl(() => geocoder)

    geocoder.on('result', (e) => {
        const coords = e.result.geometry.coordinates;
        console.log(coords)
        setLong(coords[0])
        setLat(coords[1])
    })

  return (
    null
  )
}

export default NameSearchLocation