import { AxesHelper } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

export default function Handsfree({ ...props }) {
  const [active, setActive] = useState(false);

  const annotationsRef = useRef();

  window.handsfree.enablePlugins("browser");

  function startHandsfree() {
    window.handsfree.start();
  }
  function stopHandsfree() {
    setActive(false);
    window.handsfree.stop();
  }

  const handAdapterRef = useRef();

  const handleHandsFreeData = (event) => {
    const data = event.detail;
    // If the Hand is not visible
    if (!data?.handpose?.handInViewConfidence || !data.handpose) return;

    const handPose = window.handsfree?.model?.handpose;
    const centerPalmObjPosition = handPose?.three?.centerPalmObj?.position;
    if (!centerPalmObjPosition) return;

    const handPoseDataAnnotations =
      window.handsfree?.data?.handpose?.annotations;

    // Update Hand Koordinates
    annotationsRef.current = handPoseDataAnnotations;

    // Proceeding with the Finger calculations
    const indexFingerPoint = handPoseDataAnnotations?.indexFinger?.[0];
    const pinkyPoint = handPoseDataAnnotations?.pinky?.[0];
    const palmBasePoint = handPoseDataAnnotations?.palmBase?.[0];
    if (
      !handAdapterRef.current ||
      !indexFingerPoint ||
      !pinkyPoint ||
      !palmBasePoint
    )
      return;

    const handBorder = handPose?.three?.meshes?.[17];
    const handBorderFront = handPose?.three?.meshes?.[9];

    const axisHelperHandBorder = new AxesHelper(100);
    handBorder.add(axisHelperHandBorder);

    const axisHelperHandBorderFront = new AxesHelper(100);
    handBorderFront.add(axisHelperHandBorderFront);

    if (handAdapterRef.current) {
      handAdapterRef.current.position.copy(centerPalmObjPosition);
      handAdapterRef.current.rotation.copy(handBorder.rotation);

      handAdapterRef.current.rotateX(-Math.PI / 2);
      handAdapterRef.current.rotateZ(Math.PI);
    }
    console.log(annotationsRef);
  };

  const handleHandsFreeInit = () => {
    setActive(true);
    const threeScene = window.handsfree?.model?.handpose?.three?.scene;

    const loader = new GLTFLoader();

    loader.load(
      process.env.PUBLIC_URL + "/devicev19.glb",
      function (gltf) {
        threeScene.add(gltf.scene);
        handAdapterRef.current = gltf.scene;
        handAdapterRef.current.scale.set(1.5, 1.5, 1.5);

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
          >
            🖐️ Start Live Demo
          </button>
          <button className="fancy-button handsfree-show-when-loading">
            ...loading...
          </button>
          <button
            className="fancy-button handsfree-show-when-started"
            onClick={stopHandsfree}
          >
            Stop handsfree
          </button>
        </p>
      </header>
      {active && annotationsRef.current && (
        <Canvas>
          {/**Handadapter Rendering */ <mesh></mesh>}
          {/**Rendering each Bone of the Hand */}
        </Canvas>
      )}
      <div></div>
    </div>
  );
}
