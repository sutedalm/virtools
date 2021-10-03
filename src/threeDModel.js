import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Device from "./Device"
import { Suspense, useRef } from 'react';

export default function ThreeDimModel({ ...props }) {
  const ref = useRef();
  return (
    <>
      <Canvas camera={{position: [0,-180,300]}} backgr>
        <OrbitControls ref={ref} enableZoom={false} autoRotate autoRotateSpeed={0.25}/>
        <Environment preset="night" background/>
        <ambientLight color="#f5f5f5" intensity={0.2} />
        <Suspense fallback={null}>
          <directionalLight color="white" intensity={0} position={[0, -50, 100]} />
          <Device />
        </Suspense>
      </Canvas>
    </>
  )
}
