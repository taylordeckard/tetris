import { MutableRefObject, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const startingHeightMap: { [key: string]: number } = {
  I: 15.5,
  J: 16,
  L: 16,
  O: 16.5,
  S: 16,
  T: 16,
  Z: 16,
};

export function useGravity (activePiece: MutableRefObject<Mesh>, next: string) {
  const [y, setY] = useState(16.5);
  const [reset, setReset] = useState(0);
  const SPEED = 1000;
  useEffect(() => {
    const interval = setInterval(() => {
      setY(y => y - 1);
    }, SPEED);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (activePiece.current) {
      setY(startingHeightMap[activePiece.current.name]);
    }
    // eslint-disable-next-line
  }, [activePiece.current]);
  useFrame(() => {
    if (activePiece.current) {
      if (y > 0) {
        activePiece.current.position.y = y;
      } else {
        activePiece.current.position.y = 0;
      }
      if (y <= 0) {
        setReset(reset + 1);
        setY(startingHeightMap[next]);
      }
    }
  });

  return reset;

}
