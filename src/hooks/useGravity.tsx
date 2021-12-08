import { MutableRefObject, useContext, useEffect, useState } from 'react';
import { StateContext } from '../StateProvider';
import { useFrame } from '@react-three/fiber';
import { Box3, Mesh } from 'three';
import {
  BOUNDARY_MIN_Y,
  TMINO_STARTING_Y_MAP,
} from '../constants';

export function useGravity (activePiece: MutableRefObject<Mesh>, next: string) {
  const { state } = useContext(StateContext);
  const [y, setY] = useState(16.5);
  const [reset, setReset] = useState(0);
  const SPEED = 500;
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
    return (Math.round(box.min.y * 10) / 10) <= BOUNDARY_MIN_Y - 1;
  }

  function intersectsLocked () {
    return [...activePiece.current.children].some(mesh => {
      const mBox = new Box3();
      mBox.setFromObject(mesh);
      return state.lockedBoxes.some(box => {
        const boxX = Math.round((Math.round(box.min.x) + Math.round(box.max.x)) / 2);
        const meshX = Math.round((Math.round(mBox.min.x) + Math.round(mBox.max.x)) / 2);
        const roundedMaxY = Math.round(box.max.y * 10) / 10;
        const roundedMinY = Math.round(mBox.min.y * 10) / 10;
        return meshX === boxX && roundedMaxY === roundedMinY;
      });
    })
  }

  useFrame(() => {
    if (activePiece.current) {
      activePiece.current.position.y = y;
      if (intersectsFloor()) {
        activePiece.current.position.y = y + 1;
        setReset(reset + 1);
        setY(TMINO_STARTING_Y_MAP[next]);
        return;
      }
      if (intersectsLocked()) {
        setReset(reset + 1);
        setY(TMINO_STARTING_Y_MAP[next]);
      }
    }
  });

  return reset;

}
