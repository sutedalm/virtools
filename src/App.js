import { Mesh, Plane, PlaneHelper, Vector3, AxesHelper } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useEffect, useRef, useState } from "react";

function App() {
  const [oldScale, setScale] = useState(1);

  window.handsfree.enablePlugins("browser");

  function startHandsfree() {
    window.handsfree.start();
  }
  function stopHandsfree() {
    window.handsfree.stop();
  }

  console.log("handsfree", window.handsfree);
  const handAdapterRef = useRef();

  const handleHandsFreeData = (event) => {
    const data = event.detail;
    const handPose = window.handsfree?.model?.handpose;
    const centerPalmObjPosition = handPose?.three?.centerPalmObj?.position;

    const handPoseDataAnnotations =
      window.handsfree?.data?.handpose?.annotations;
    const indexFingerPoint = handPoseDataAnnotations?.indexFinger?.[0];
    const pinkyPoint = handPoseDataAnnotations?.pinky?.[0];
    const palmBasePoint = handPoseDataAnnotations?.palmBase?.[0];
    console.log("points", indexFingerPoint, pinkyPoint, palmBasePoint);

    const handBorder = handPose?.three?.meshes?.[17];
    const handBorderFront = handPose?.three?.meshes?.[9];

    const axisHelperHandBorder = new AxesHelper(100);
    handBorder.add(axisHelperHandBorder);

    const axisHelperHandBorderFront = new AxesHelper(100);
    handBorderFront.add(axisHelperHandBorderFront);

    if (
      !data.handpose ||
      !handAdapterRef.current ||
      !centerPalmObjPosition ||
      !indexFingerPoint ||
      !pinkyPoint ||
      !palmBasePoint
    )
      return;

    if (handAdapterRef.current) {
      handAdapterRef.current.position.copy(centerPalmObjPosition);
      handAdapterRef.current.rotation.copy(handBorder.rotation);

      handAdapterRef.current.rotateX(-Math.PI / 2);
      handAdapterRef.current.rotateZ(Math.PI);
    }
  };

  const handleHandsFreeInit = () => {
    const threeScene = window.handsfree?.model?.handpose?.three?.scene;

    const loader = new GLTFLoader();

    loader.load(
      process.env.PUBLIC_URL + "/devicev19.glb",
      function (gltf) {
        threeScene.add(gltf.scene);
        handAdapterRef.current = gltf.scene;
        handAdapterRef.current.scale.set(1.5, 1.5, 1.5);

        console.log("Adapter", handAdapterRef);
        console.log("Model loaded.");
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  };

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
            className="fancy-button handsfree-show-when-stopped handsfree-hide-when-loading"
            onClick={startHandsfree}
          >🖐️ Start Live Demo</button>
          <button className="fancy-button handsfree-show-when-loading">...loading...</button>
          <button
            className="fancy-button handsfree-show-when-started"
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
