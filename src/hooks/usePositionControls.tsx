import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StateContext } from 'State';
import { useFrame } from '@react-three/fiber';
import { Box3, Object3D } from 'three';
import {
  BOUNDARY_MAX_X,
  BOUNDARY_MIN_X,
  TMINO_STARTING_X_MAP,
} from '../constants';
import { roundTenth } from 'utils';

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
    let downMovement = false;
    const arrowRightLeftHandler = (event: KeyboardEvent) => {
      const box = new Box3();
      if (activePiece) {
        box.setFromObject(activePiece);
      }
      if (!state.paused && !downMovement) {
        if (event.key === 'ArrowDown') { downMovement = true; }
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
      }
    };
    function onKeyUp (event: KeyboardEvent) {
      if (event.key === 'ArrowDown') { downMovement = false; }
    }
    document.addEventListener('keydown', arrowRightLeftHandler);
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keydown', arrowRightLeftHandler);
      document.removeEventListener('keyup', onKeyUp);
    };
    // eslint-disable-next-line
  }, [activePiece, state]);
  const isInsideBoundary = useCallback((box: Box3, offset: number) => {
    return ((box.min.x + offset) >= BOUNDARY_MIN_X)
      && ((box.max.x + offset) <= BOUNDARY_MAX_X);
  }, []);
  const intersectsLocked = useCallback((offset: number) => {
    return [...(activePiece?.children ?? [])].some(mesh => {
      const mBox = new Box3();
      mBox.setFromObject(mesh);
      return stateRef.current.lockedObjects.some(obj => {
        const box = new Box3();
        box.setFromObject(obj);
        const boxY = roundTenth((roundTenth(box.min.y) + roundTenth(box.max.y)) / 2);
        const meshY = roundTenth((roundTenth(mBox.min.y) + roundTenth(mBox.max.y)) / 2);
        const roundedBoxMinX = (Math.round(box.min.x * 10) / 10);
        const roundedMeshMinX = (Math.round(mBox.min.x * 10) / 10) + offset;
        const intersects = meshY === boxY && roundedBoxMinX === roundedMeshMinX;
        return intersects;
      });
    });
  }, [activePiece]);

  useFrame(() => {
    if (activePiece) {
      activePiece.position.x = xOffset;
    }
  });
}
