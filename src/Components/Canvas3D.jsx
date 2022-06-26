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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Content from './Content';

const modes = ['translate', 'rotate', 'scale'];
const state = proxy({ current: null, mode: 0 });

gsap.registerPlugin(ScrollTrigger);

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

function Me({ instances, anim, ...props }) {
  const group = useRef();

  const { nodes, materials, animations } = useGLTF('/me-transformed.glb');
  const scrollRef = useRef();
  const { actions } = useAnimations(animations, group);

  useFrame(() => {
    scrollRef.current.rotation.y = anim.y;
    scrollRef.current.rotation.x = anim.x;
    scrollRef.current.position.z = anim.positionZ;
    scrollRef.current.position.y = anim.positionY;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group ref={scrollRef} name="Scene">
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

function Canvas3D({ mainRef }) {
  let animable = {
    x: 0.8,
    y: 7,
    positionZ: 3,
    positionY: -0.14,
  };

  useEffect(() => {
    if (mainRef) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
          markers: false,
        },
      });
      tl.to(animable, {
        x: -0.45,
        y: 0.5,
        positionZ: 0,
        positionY: 0,
      });
    }
  }, [mainRef]);

  return (
    <Canvas
      camera={{ fov: 8, near: 0.01, far: 4000 }}
      gl={{ alpha: true }}
      shadows
    >
      <ambientLight intensity={0.8} color={'#DAD9D0'} />
      <spotLight
        intensity={0.7}
        position={(0, 1, 1)}
        penumbra={0.1}
        color={'#DAD9D0'}
      />

      <Me anim={animable} />

      <color attach="background" args={['#E9E8E2']} />

      <EffectComposer>
        <Bloom
          kernelSize={3}
          luminanceThreshold={0.2}
          luminanceSmoothing={0}
          intensity={4}
          opacity={0.05}
        />

        <Noise premultiply blendFunction={BlendFunction.SCREEN} opacity={0.8} />

        <Vignette
          offset={0.1}
          darkness={0.5}
          eskil={false}
          blendFunction={BlendFunction.NORMAL}
        />

        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0004, 0.0004]}
        />
      </EffectComposer>
    </Canvas>
  );
}

export default Canvas3D;
