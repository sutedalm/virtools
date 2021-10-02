import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from "three";
import { useEffect, useRef } from "react";

function App() {
  window.handsfree.enablePlugins("browser");

  function startHandsfree() {
    window.handsfree.start();
  }
  function stopHandsfree() {
    window.handsfree.stop();
  }

  console.log("handsfree", window.handsfree);

  const handPose = window.handsfree?.model?.handpose;
  const threeScene = handPose?.three?.scene;
  const indexFinger = handPose?.data?.landmarks?.[8];

  console.log("handpose", handPose);

  const cubeRef = useRef();
  useEffect(() => {
    const geometry = new BoxBufferGeometry(60, 60, 60);
    const material = new MeshBasicMaterial();
    cubeRef.current = new Mesh(geometry, material);
  }, []);

  useEffect(() => {
    if (indexFinger) {
      console.log("Centered Palm object", indexFinger);
      cubeRef.current.position.set(
        indexFinger[0],
        indexFinger[1],
        indexFinger[3]
      );

      console.log("Cube position", cubeRef.current.position);
      console.log("Cube", cubeRef.current);
      console.log("Index finger position", indexFinger);
    }
  }, [JSON.stringify(indexFinger)]);

  useEffect(() => {
    if (threeScene && cubeRef.current) {
      console.log("ThreeScene", threeScene);
      threeScene.add(cubeRef.current);
    }
  }, [threeScene, cubeRef.current]);

  return (
    <div className="App">
      <header className="App-header">
        {/* These classes are included by handsfree.css */}
        <p>
          <button
            className="handsfree-show-when-stopped handsfree-hide-when-loading"
            onClick={startHandsfree}
          >
            Start handsfree
          </button>
          <button className="handsfree-show-when-loading">...loading...</button>
          <button
            className="handsfree-show-when-started"
            onClick={stopHandsfree}
          >
            Stop handsfree
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
