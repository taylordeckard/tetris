import { MutableRefObject, useContext, useEffect, useState } from 'react';
import { StateContext } from '../StateProvider';
import { useFrame } from '@react-three/fiber';
import { Box3, Mesh } from 'three';
import {
  BOUNDARY_MIN_Y,
  TMINO_STARTING_Y_MAP,
} from '../constants';

export function useGravity (activePiece: MutableRefObject<Mesh>) {
  const { state } = useContext(StateContext);
  const [y, setY] = useState(16.5);
  const [reset, setReset] = useState(0);
  const [pause, setPause] = useState(false);
  const SPEED = 500;
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) {
        setY(y => y - 1);
      }
    }, SPEED);
    return () => clearInterval(interval);
  }, [pause]);
  useEffect(() => {
    const onPKey = (event: KeyboardEvent) => {
      if (event.key === 'p') {
        setPause(p => !p);
      }
    }
    document.addEventListener('keydown', onPKey);
    return () => document.removeEventListener('keydown', onPKey);
  }, []);
  useEffect(() => {
    const onDownArrow = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        setY(y => y - 1);
      }
    }
    document.addEventListener('keydown', onDownArrow);
    return () => document.removeEventListener('keydown', onDownArrow);
  }, []);
  useEffect(() => {
    if (activePiece.current) {
      setY(TMINO_STARTING_Y_MAP[activePiece.current.name]);
    }
    // eslint-disable-next-line
  }, []);

  function intersectsFloor () {
    const box = new Box3();
    box.setFromObject(activePiece.current);
    return (Math.round(box.min.y * 10) / 10) <= BOUNDARY_MIN_Y - 1;
  }

  function intersectsLocked () {
    return [...activePiece.current.children].some(mesh => {
      const mBox = new Box3();
      mBox.setFromObject(mesh);
      return state.lockedObjects.some(obj => {
        const box = new Box3();
        box.setFromObject(obj);
        const boxX = Math.round((Math.round(box.min.x) + Math.round(box.max.x)) / 2);
        const meshX = Math.round((Math.round(mBox.min.x) + Math.round(mBox.max.x)) / 2);
        const roundedBoxMinY = Math.round(box.min.y * 10) / 10;
        const roundedMeshMinY = Math.round(mBox.min.y * 10) / 10;
        return meshX === boxX && roundedBoxMinY === roundedMeshMinY;
      });
    })
  }

  useFrame(() => {
    if (activePiece.current) {
      activePiece.current.position.y = y;
      if (intersectsFloor() || intersectsLocked()) {
        activePiece.current.position.y = y + 1;
        setReset(reset + 1);
        setY(TMINO_STARTING_Y_MAP[state.nextTetromino]);
        console.log(state.nextTetromino);
      }
    }
  });

  return reset;
}
