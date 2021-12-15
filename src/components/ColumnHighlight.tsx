import { useRef, useState } from 'react';
import { Box3, DoubleSide, Mesh, Object3D, PlaneGeometry } from 'three';
import { useFrame } from '@react-three/fiber';

export function ColumnHighlight (props: {
  activePiece?: Object3D,
}) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const meshRef = useRef<Mesh>();
  const planeRef = useRef<PlaneGeometry>();

  function getY () {
    return (height / 2) - 0.5;
  }

  useFrame(() => {
    if (props.activePiece) {
      const box = new Box3()
      box.setFromObject(props.activePiece);
      const height = box.max.x - box.min.x;
      setWidth(height);
      setHeight(box.min.y + 0.5);
      if (meshRef.current) {
        meshRef.current.position.set(
          (box.max.x + box.min.x) / 2,
          getY(),
          -0.5,
        );
      }
    }
  });


  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width,height]} ref={planeRef} />
      <meshStandardMaterial transparent color="blue" opacity={0.2} side={DoubleSide} />
    </mesh>
  );
}
