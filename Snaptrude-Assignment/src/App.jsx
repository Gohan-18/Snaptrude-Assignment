import "./App.css";
import MapBox from "./components/MapBox";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Babylon from "./components/Babylon";

// const MAPBOX_TOKEN ="pk.eyJ1IjoicHJhYi1oYXQxOCIsImEiOiJjbGZiNjVuaGQyeGxnM29yMDU3MGQzaGVhIn0.8eObBAjrqScgVVrmE-pbOQ";
// const MAPBOX_TOKEN = import.meta.env.VITE_MAP_TOKEN;

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={<MapBox/>} />
      <Route path="/babylon" element={<Babylon/>} />
    </>
  ))

  return (
    <>
      <RouterProvider router={router} /> 
    </>
  );
}

export default App;
