import { MutableRefObject, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box3, Mesh } from 'three';
import {
  BOUNDARY_MIN_Y,
  TMINO_STARTING_Y_MAP,
} from '../constants';

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

  function intersectsFloor () {
    const box = new Box3();
    box.setFromObject(activePiece.current);
    return box.min.y <= BOUNDARY_MIN_Y;
  }

  useFrame(() => {
    if (activePiece.current) {
      if (y > 0) {
        activePiece.current.position.y = y;
      } else {
        activePiece.current.position.y = 0;
      }
      if (intersectsFloor()) { 
        // TODO also check if piece would intersect the LockedPieces
        setReset(reset + 1);
        setY(TMINO_STARTING_Y_MAP[next]);
      }
    }
  });

  return reset;

}
