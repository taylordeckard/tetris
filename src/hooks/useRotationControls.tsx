import { useContext, useEffect, useState } from 'react';
import { StateContext } from 'State';
import { useFrame } from '@react-three/fiber';
import { Box3, Object3D, MathUtils } from 'three';
import { BOUNDARY_MAX_X, BOUNDARY_MIN_X } from '../constants';

export function useRotationControls (activePiece?: Object3D) {
  const { state } = useContext(StateContext);
  const [rotation, setRotation] = useState<number>(0);
  useEffect(() => {
    const arrowUpHandler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' && !state.paused) {
        setRotation(r => {
          const newR = r === 270 ? 0 : r + 90;
          if (activePiece) {
            const clone = activePiece.clone();
            const box = new Box3();
            clone.rotation.z = newR;
            box.setFromObject(clone);
            if (isInsideBoundary(box)) { return newR; }
          }
          return r;
        });
      }
    };
    document.addEventListener('keydown', arrowUpHandler);
    return () => document.removeEventListener('keydown', arrowUpHandler);
    // eslint-disable-next-line
  }, [activePiece, state]);
  function isInsideBoundary (box: Box3) {
    return box.min.x >= BOUNDARY_MIN_X
      && box.max.x <= BOUNDARY_MAX_X;
  }
  useFrame(() => {
    if (activePiece?.rotation) {
      activePiece.rotation.z = MathUtils.degToRad(rotation);
    }
  });
}
