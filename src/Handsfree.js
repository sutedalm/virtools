import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useEffect, useRef } from "react";

export default function Handsfree() {
  window.handsfree.enablePlugins("browser");

  const handAdapterRef = useRef();

  const handleHandsFreeData = (event) => {
    const data = event.detail;
    // If the Hand is not visible
    if (!data?.handpose?.handInViewConfidence || !data.handpose) return;

    const handPose = window.handsfree?.model?.handpose;
    const centerPalmObjPosition = handPose?.three?.centerPalmObj?.position;
    if (!centerPalmObjPosition) return;

    // Proceeding with the Finger calculations
    if (!handAdapterRef.current) return;

    const handBorder = handPose?.three?.meshes?.[17];

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

  return <></>;
}
