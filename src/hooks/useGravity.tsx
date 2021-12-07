import { MutableRefObject, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { TMINO_STARTING_Y_MAP } from '../constants';

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
      setY(TMINO_STARTING_Y_MAP[activePiece.current.name]);
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
        setY(TMINO_STARTING_Y_MAP[next]);
      }
    }
  });

  return reset;

}
