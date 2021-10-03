import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';

import "./page.css"
function Page() {
  return (
    <content>
      <div class="header">
        <h1>VirTools</h1>
        <h2>Space Apps Challenge</h2>
      </div>
      <div class="canvas-container">
        <Canvas>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          <mesh>
            <ambientLight intensity={0.1} />
            <directionalLight color="red" position={[0, 0, 5]} />
          <boxGeometry args={[2,2,2]}/>
          <meshStandardMaterial />
          </mesh>
        </Canvas>
      </div>
    </content>        
  )
}
export default Page;