import { useContext, useEffect, useRef } from 'react';
import { StateContext } from 'State';
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
  const { state } = useContext(StateContext);
  const controls = useRef<OC>();
  const { camera, gl } = useThree();
  useEffect(() => {
    if (controls.current) {
      controls.current.target = new Vector3(0, 7.5, 0);
      if (state.camera === 'perspective') {
        camera.position.set(0, 7.5, 25);
        camera.zoom = 1;
      } else {
        camera.position.set(0, 7.95, 10);
        camera.zoom = 38;
      }
    }
  }, [camera, state.camera]);
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
