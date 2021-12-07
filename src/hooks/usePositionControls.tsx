import { MutableRefObject, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box3, Group } from 'three';
import {
  BOUNDARY_MAX_X,
  BOUNDARY_MIN_X,
  TMINO_STARTING_X_MAP,
} from '../constants';

export function usePositionControls (
  ref: MutableRefObject<Group>,
  pieceLetter: string,
  reset: number,
) {
  const [xOffset, setXOffset] = useState(0);
  useEffect(() => {
    setXOffset(TMINO_STARTING_X_MAP[pieceLetter]);
  }, [pieceLetter, reset]);
  useEffect(() => {
    const arrowRightLeftHandler = (event: KeyboardEvent) => {
      const box = new Box3();
      box.setFromObject(ref.current);
      if (event.key === 'ArrowLeft' && isInsideBoundary(box, -1)) {
        setXOffset(x => x - 1);
      }
      if (event.key === 'ArrowRight' && isInsideBoundary(box, 1)) {
        setXOffset(x => x + 1);
      }
    };
    document.addEventListener('keydown', arrowRightLeftHandler);
    return () => document.removeEventListener('keydown', arrowRightLeftHandler);
    // eslint-disable-next-line
  }, []);
  function isInsideBoundary (box: Box3, offset: number) {
    return ((box.min.x + offset) >= BOUNDARY_MIN_X)
      && ((box.max.x + offset) <= BOUNDARY_MAX_X);
  }
  useFrame(() => {
    if (ref.current) {
      ref.current.position.x = xOffset;
    }
  });
}
