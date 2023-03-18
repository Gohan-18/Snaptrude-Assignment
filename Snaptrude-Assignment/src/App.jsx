import "./App.css";
import MapBox from "./components/MapBox";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Babylon from "./components/Babylon";
import { createContext, useState } from "react";

// const MAPBOX_TOKEN ="pk.eyJ1IjoicHJhYi1oYXQxOCIsImEiOiJjbGZiNjVuaGQyeGxnM29yMDU3MGQzaGVhIn0.8eObBAjrqScgVVrmE-pbOQ";
// const MAPBOX_TOKEN = import.meta.env.VITE_MAP_TOKEN;

export const AppContext = createContext(null)

function App() {

  const [long, setLong] = useState(77.216721);
  const [lat, setLat] = useState(28.6448);

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={<MapBox/>} />
      <Route path="/babylon" element={<Babylon/>} />
    </>
  ))

  return (
    <>
    <AppContext.Provider value={{long, lat, setLong, setLat}} >
      <RouterProvider router={router} /> 
    </AppContext.Provider>
    </>
  );
}

export default App;
