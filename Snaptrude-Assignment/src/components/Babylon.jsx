import React, { useContext } from "react";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Texture } from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory
import { AppContext } from "../App";
import { MAPBOX_TOKEN } from "./MapBox";
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
// import "../";

let box;

export default () => {

    const { long, lat } = useContext(AppContext);

    const onSceneReady = (scene) => {

        const img = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${long},${lat},10,0,60/600x600?access_token=${MAPBOX_TOKEN}`
    
        // localStorage.setItem();
    
        function createBoxMaterial() {
            const boxMat = new StandardMaterial('boxMat', scene);
    
            const diffuseText = new Texture(
                img, scene
            )
            boxMat.diffuseTexture = diffuseText
    
            return boxMat;
        }
      // This creates and positions a free camera (non-mesh)
      const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    
      // This targets the camera to scene origin
      camera.setTarget(Vector3.Zero());
    
      const canvas = scene.getEngine().getRenderingCanvas();
    
      // This attaches the camera to the canvas
      camera.attachControl(canvas, true);
    
      // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
      const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    
      // Default intensity is 1. Let's dim the light a small amount
      light.intensity = 0.7;
    
      // Our built-in 'box' shape.
      box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
    
      box.material = createBoxMaterial();
    
      // Move the box upward 1/2 its height
      box.position.y = 1;
    
      // Our built-in 'ground' shape.
      MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    };
    
    /**
     * Will run on every frame render.  We are spinning the box on y-axis.
     */
    const onRender = (scene) => {
      if (box !== undefined) {
        const deltaTimeInMillis = scene.getEngine().getDeltaTime();
    
        const rpm = 10;
        box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
      }
    };

    return(
    <div style={{height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
        <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
    </div>)
};