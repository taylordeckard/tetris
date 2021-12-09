import { useContext, useEffect, useRef, useState } from 'react';
import { StateContext } from '../StateProvider';
import { useFrame } from '@react-three/fiber';
import { Box3, Object3D } from 'three';
import {
  BOUNDARY_MAX_X,
  BOUNDARY_MIN_X,
  TMINO_STARTING_X_MAP,
} from '../constants';

export function usePositionControls (
  pieceLetter: string,
  reset: number,
  activePiece?: Object3D,
) {
  const { state } = useContext(StateContext);
  const stateRef = useRef(state);
  useEffect(() => { stateRef.current = state; }, [state]);
  const [xOffset, setXOffset] = useState(0);
  useEffect(() => {
    setXOffset(TMINO_STARTING_X_MAP[pieceLetter]);
  }, [pieceLetter, reset]);
  useEffect(() => {
    const arrowRightLeftHandler = (event: KeyboardEvent) => {
      const box = new Box3();
      if (activePiece) {
        box.setFromObject(activePiece);
      }
      if (
        event.key === 'ArrowLeft'
        && isInsideBoundary(box, -1)
        && !intersectsLocked(-1)
      ) {
        setXOffset(x => x - 1);
      }
      if (
        event.key === 'ArrowRight'
        && isInsideBoundary(box, 1)
        && !intersectsLocked(1)
      ) {
        setXOffset(x => x + 1);
      }
    };
    document.addEventListener('keydown', arrowRightLeftHandler);
    return () => document.removeEventListener('keydown', arrowRightLeftHandler);
    // eslint-disable-next-line
  }, [activePiece]);
  function isInsideBoundary (box: Box3, offset: number) {
    return ((box.min.x + offset) >= BOUNDARY_MIN_X)
      && ((box.max.x + offset) <= BOUNDARY_MAX_X);
  }
  function intersectsLocked (offset: number) {
    return [...(activePiece?.children ?? [])].some(mesh => {
      const mBox = new Box3();
      mBox.setFromObject(mesh);
      return stateRef.current.lockedObjects.some(obj => {
        const box = new Box3();
        box.setFromObject(obj);
          const boxY = Math.round((Math.round(box.min.y) + Math.round(box.max.y)) / 2);
          const meshY = Math.round((Math.round(mBox.min.y) + Math.round(mBox.max.y)) / 2);
          const roundedBoxMinX = (Math.round(box.min.x * 10) / 10);
          const roundedMeshMinX = (Math.round(mBox.min.x * 10) / 10) + offset;
          return meshY === boxY && roundedBoxMinX === roundedMeshMinX;
      });
    })
  }
  useFrame(() => {
    if (activePiece) {
      activePiece.position.x = xOffset;
    }
  });
}
