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

  const cubeRef = useRef();

  const handleHandsFreeData = (event) => {
    const data = event.detail;
    const handPose = window.handsfree?.model?.handpose;
    const centerPalmObjPosition = handPose?.three?.centerPalmObj?.position;
    console.log("CENTERPALM", centerPalmObjPosition);
    if (!data.handpose || !cubeRef.current || !centerPalmObjPosition) return;
    cubeRef.current.position.set(
      centerPalmObjPosition.x,
      centerPalmObjPosition.y,
      centerPalmObjPosition.z
    );
    // console.log(data);
  };

  const handleHandsFreeInit = (event) => {
    const threeScene = window.handsfree?.model?.handpose?.three?.scene;
    threeScene.add(cubeRef.current);
  };

  useEffect(() => {
    const geometry = new BoxBufferGeometry(60, 60, 60);
    const material = new MeshBasicMaterial();
    cubeRef.current = new Mesh(geometry, material);
  }, []);

  useEffect(() => {
    document.addEventListener("handsfree-data", handleHandsFreeData);

    const threeScene = window.handsfree?.model?.handpose?.three?.scene;
    if (threeScene) {
      handleHandsFreeInit();
    } else {
      document.addEventListener(
        "handsfree-handposeModelReady",
        handleHandsFreeInit
      );
    }

    return () => {
      document.removeEventListener("handsfree-data", handleHandsFreeData);
      document.removeEventListener(
        "handsfree-handposeModelReady",
        handleHandsFreeInit
      );
    };
  }, []);

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
