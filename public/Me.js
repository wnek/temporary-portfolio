/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/me-transformed.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Frame.geometry} material={materials['Material.003']} />
      <mesh geometry={nodes.Glass.geometry} material={materials['Material.004']} />
      <mesh geometry={nodes.Band.geometry} material={materials['Material.001']} />
      <mesh geometry={nodes.TShirt.geometry} material={materials['Material.002']} />
    </group>
  )
}

useGLTF.preload('/me-transformed.glb')
