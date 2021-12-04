import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useRef } from 'react';

export function Cube () {
  const cube = useRef<Mesh>();
  useFrame(() => {
    if (cube.current?.rotation) {
      // cube.current.rotation.x += 0.01;
      cube.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh ref={cube} castShadow={true}>
      <boxGeometry />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}
