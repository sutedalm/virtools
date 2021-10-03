import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Device from "./Device"
import "./page.css"
import App from "./App"

function Page() {
  return (
    <content>
      <div class="header">
        <h1>VirTools</h1>
        <h2>Space Apps Challenge</h2>
      </div>
      <div class="canvas-container">
        <Canvas camera={{position: [0,40,100]}}>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <ambientLight color="#f5f5f5" intensity={0.3} />
        <Suspense fallback={null}>
            <directionalLight color="white" position={[0, 0, 5]} />
            <Device />
          </Suspense>
        </Canvas>
      </div>
      < h1>AR-Demo</h1>
      <div class="handsfree-container">
        <App />
      </div>
    </content>        
  )
}
export default Page;