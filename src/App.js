import { Plane, PlaneHelper, Vector3 } from "three";
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

  // const cubeRef = useRef();
  const handAdapterRef = useRef();
  const handPlaneRef = useRef();

  const handleHandsFreeData = (event) => {
    const data = event.detail;
    const handPose = window.handsfree?.model?.handpose;
    const centerPalmObjPosition = handPose?.three?.centerPalmObj?.position;

    const handPoseDataAnnotations =
      window.handsfree?.data?.handpose?.annotations;
    // console.log("DATA", handPoseDataAnnotations);
    const indexFingerPoint = handPoseDataAnnotations?.indexFinger?.[0];
    const pinkyPoint = handPoseDataAnnotations?.pinky?.[0];
    const palmBasePoint = handPoseDataAnnotations?.palmBase?.[0];
    // console.log("points", indexFingerPoint, pinkyPoint, palmBasePoint);

    const handBorder = handPose?.three?.meshes?.[17];
    // console.log("CENTERPALM", centerPalmObjPosition);
    if (
      !data.handpose ||
      !handAdapterRef.current ||
      !centerPalmObjPosition ||
      !indexFingerPoint ||
      !pinkyPoint ||
      !palmBasePoint
    )
      return;

    handPlaneRef.current.setFromCoplanarPoints(
      new Vector3(...indexFingerPoint),
      new Vector3(...pinkyPoint),
      new Vector3(...palmBasePoint)
    );
    handPlaneRef.current.setFromNormalAndCoplanarPoint(
      handPlaneRef.current.normal,
      centerPalmObjPosition
    );

    handPlaneRef.current.normalize();

    console.log("handplane", handPlaneRef.current);
    // cubeRef.current.position.copy(centerPalmObjPosition);
    // cubeRef.current.rotation.copy(handBorder.rotation);

    if (handAdapterRef.current) {
      handAdapterRef.current.position.copy(centerPalmObjPosition);
      handAdapterRef.current.rotation.copy(handBorder.rotation);
    }
    // console.log(data);
  };

  const handleHandsFreeInit = () => {
    const threeScene = window.handsfree?.model?.handpose?.three?.scene;
    // threeScene.add(new AmbientLight(0x404040));
    // threeScene.add(cubeRef.current);
    handPlaneRef.current = new Plane();
    const planeHelper = new PlaneHelper(handPlaneRef.current, 50);

    threeScene.add(planeHelper);

    const loader = new GLTFLoader();

    loader.load(
      process.env.PUBLIC_URL + "/devicev19.glb",
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

  // useEffect(() => {
  //   const geometry = new BoxBufferGeometry(20, 20, 20);
  //   const material = new LineDashedMaterial({
  //     color: "grey",
  //     linewidth: 1,
  //     scale: 1,
  //     dashSize: 3,
  //     gapSize: 1,
  //   });
  //   cubeRef.current = new Mesh(geometry, material);
  // }, []);

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
