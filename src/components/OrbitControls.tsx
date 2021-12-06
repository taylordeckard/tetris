import { useEffect, useRef } from 'react';
import { extend, Object3DNode, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as OC } from 'three-stdlib';
import { Vector3 } from 'three';

extend({ OrbitControls: OC });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'orbitControls': Object3DNode<OC, typeof OC>;
    }
  }
}

export function OrbitControls () {
  const controls = useRef<OC>();
  const { camera, gl } = useThree();
  useEffect(() => {
    if (controls.current) {
      controls.current.target = new Vector3(0, 7.5, 0);
    }
  }, [controls]);
  useFrame(() => {
    controls.current?.update();
  });
  return (
    <orbitControls
      args={[camera, gl.domElement]}
      ref={controls}/>
  );
}
