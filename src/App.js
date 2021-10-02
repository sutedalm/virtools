import {
  BoxBufferGeometry,
  Mesh,
  LineDashedMaterial,
  AmbientLight,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
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
  const handAdapterRef = useRef();

  const handleHandsFreeData = (event) => {
    const data = event.detail;
    const handPose = window.handsfree?.model?.handpose;
    const centerPalmObjPosition = handPose?.three?.centerPalmObj?.position;
    const handBorder = handPose?.three?.meshes?.[17];
    // console.log("CENTERPALM", centerPalmObjPosition);
    if (!data.handpose || !cubeRef.current || !centerPalmObjPosition) return;
    cubeRef.current.position.copy(centerPalmObjPosition);
    cubeRef.current.rotation.copy(handBorder.rotation);

    if (handAdapterRef.current) {
      handAdapterRef.current.position.copy(centerPalmObjPosition);
      handAdapterRef.current.rotation.copy(handBorder.rotation);
    }
    // console.log(data);
  };

  const handleHandsFreeInit = () => {
    const threeScene = window.handsfree?.model?.handpose?.three?.scene;
    threeScene.add(new AmbientLight(0x404040));
    threeScene.add(cubeRef.current);
    const loader = new GLTFLoader();

    loader.load(
      process.env.PUBLIC_URL + "/handAdapter.glb",
      function (gltf) {
        threeScene.add(gltf.scene);
        handAdapterRef.current = gltf.scene;
        // console.log("handadapter", handAdapterRef.current);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    // const handPose = window.handsfree?.model?.handpose;
    // const centerPalmObj = handPose?.three?.centerPalmObj;
    // const handBorder = handPose?.three?.meshes?.[17]; // threeScene.add(cubeRef.current);
    // handBorder.add(cubeRef.current);
    // console.log("scale", handBorder.scale);
    // cubeRef.current.scale.z = 1.0 / handBorder.scale.z;
  };

  useEffect(() => {
    const geometry = new BoxBufferGeometry(20, 20, 20);
    const material = new LineDashedMaterial({
      color: "grey",
      linewidth: 1,
      scale: 1,
      dashSize: 3,
      gapSize: 1,
    });
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
