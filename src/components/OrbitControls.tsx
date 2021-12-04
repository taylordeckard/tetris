import { useEffect, useRef } from 'react';
import { extend, Object3DNode, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as OC } from 'three-stdlib';

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
      controls.current.listenToKeyEvents(document.body);
    }
  }, [controls]);
  useFrame(() => {
    controls.current?.update();
  });
  return (
    <orbitControls
      args={[camera, gl.domElement]}
      enableZoom
      ref={controls}/>
  );
}
