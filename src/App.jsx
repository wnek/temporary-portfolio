import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, useAnimations } from '@react-three/drei';
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Vignette,
  ChromaticAberration,
  Noise,
} from '@react-three/postprocessing';
import { KernelSize, BlendFunction } from 'postprocessing';
import { proxy, useSnapshot } from 'valtio';
import useMeasure from 'react-use-measure';
import { useState, useEffect, useRef, useMemo } from 'react';
const modes = ['translate', 'rotate', 'scale'];
const state = proxy({ current: null, mode: 0 });

function Controls() {
  useFrame(({ camera }) => {
    camera.rotation.order = 'XYZ';
    return null;
  });

  // Get notified on changes to state
  const snap = useSnapshot(state);
  const scene = useThree((state) => state.scene);
  return (
    <>
      {snap.current && (
        <TransformControls
          object={scene.getObjectByName(snap.current)}
          mode={modes[snap.mode]}
        />
      )}
      <OrbitControls rotateSpeed={0.2} />
      {/* <FirstPersonControls lookSpeed={0.05}/> */}
    </>
  );
}

function Me({ instances, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/me-transformed.glb');

  const { actions } = useAnimations(animations, group);

  console.log(actions);

  useEffect(() => {
    console.log(actions.TShirtAction);
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Frame"
          geometry={nodes.Frame.geometry}
          material={materials['Material.003']}
        />
        <mesh
          name="Glass"
          geometry={nodes.Glass.geometry}
          material={materials['Material.004']}
        />
        <mesh
          name="Band"
          geometry={nodes.Band.geometry}
          material={materials['Material.001']}
        />
        <mesh
          name="TShirt"
          geometry={nodes.TShirt.geometry}
          material={materials['Material.002']}
        />
      </group>
    </group>
  );
}

export default function App() {
  return (
    <Canvas
      camera={{ fov: 8, near: 0.01, far: 4000 }}
      gl={{ alpha: false }}
      shadows
    >
      <ambientLight intensity={0.1} color={'#ffffff'} />
      <spotLight intensity={0.7} position={(0, 1, 1)} />
      <Me />

      <color attach="background" args={['#ffffff']} />

      <Controls />

      <EffectComposer>
        <Bloom
          kernelSize={3}
          luminanceThreshold={0.2}
          luminanceSmoothing={0}
          intensity={4}
          opacity={0.01}
        />

        <Noise premultiply blendFunction={BlendFunction.SCREEN} opacity={0.5} />

        <Vignette
          offset={0.5}
          darkness={0.1}
          eskil={false}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </Canvas>
  );
}
