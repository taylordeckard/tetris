import { ActivePiece } from './ActivePiece';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';

export function Playfield () {
  const activePiece = useRef<Mesh>();
  const [y, setY] = useState(12);
  const [resetActivePiece, setResetActivePiece] = useState(0);
  // const xMin = -5;
  // const xMax = 5;
  // const yMin = 0;
  // const yMax = 15;
  const SPEED = 1000;
  useEffect(() => {
    const interval = setInterval(() => {
      setY(y => y - 1);
    }, SPEED);
    return () => clearInterval(interval);
  }, []);
  useFrame(() => {
    if (activePiece.current) {
      if (y > 0) {
        activePiece.current.position.y = y;
      } else {
        activePiece.current.position.y = 0;
      }
      if (y === 0) {
        setResetActivePiece(resetActivePiece + 1);
        setY(12);
      }
    }
  });
  return (
    <ActivePiece position={new Vector3(0, 12, 0)} ref={activePiece} reset={resetActivePiece} />
  );
}
