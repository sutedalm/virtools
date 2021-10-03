import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const path = process.env.PUBLIC_URL + "/devicev18.glb";

export default function Device({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF(path);
  return (
    <group ref={group} {...props} dispose={null} >
      <group position={[0, 7, 0]}>
        <group scale={10}>
          <mesh geometry={nodes.Male_001.geometry} material={materials['Steel - Satin']} />
        </group>
      </group>
      <group scale={10}>
        <mesh geometry={nodes.Body1_1.geometry} material={materials.Mirror} />
        <mesh geometry={nodes.Body1_2.geometry} material={materials['Polycarbonate (Clear)']} />
        <mesh geometry={nodes.Body1_3.geometry} material={nodes.Body1_3.material} />
        <mesh geometry={nodes.Body1_4.geometry} material={materials['Paint - Metallic (Blue)']} />
        <mesh geometry={nodes.Body1_5.geometry} material={materials['Paint - Enamel Glossy (Dark Grey)']} />
        <mesh geometry={nodes.Body1_6.geometry} material={materials['Rubber - Soft']} />
      </group>
      <group scale={10}>
        <mesh geometry={nodes.Lichtknopf_1.geometry} material={nodes.Lichtknopf_1.material} />
        <mesh geometry={nodes.Lichtknopf_2.geometry} material={nodes.Lichtknopf_2.material} />
        <mesh geometry={nodes.Lichtknopf_3.geometry} material={nodes.Lichtknopf_3.material} />
      </group>
      <group scale={10}>
        <mesh geometry={nodes.Distanzknopf_1.geometry} material={nodes.Distanzknopf_1.material} />
        <mesh geometry={nodes.Distanzknopf_2.geometry} material={nodes.Distanzknopf_2.material} />
        <mesh geometry={nodes.Distanzknopf_3.geometry} material={nodes.Distanzknopf_3.material} />
      </group>
    </group>
  )
}

useGLTF.preload(path)