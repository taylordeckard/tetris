import { MutableRefObject, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box3, Group, MathUtils } from 'three';
import { BOUNDARY_MAX_X, BOUNDARY_MIN_X } from '../constants';

export function useRotationControls (ref: MutableRefObject<Group>) {
  const [rotation, setRotation] = useState<number>(0);
  useEffect(() => {
    const arrowUpHandler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setRotation(r => {
          const newR = r === 270 ? 0 : r + 90;
          const clone = ref.current.clone();
          const box = new Box3();
          clone.rotation.z = newR;
          box.setFromObject(clone);
          if (isInsideBoundary(box)) { return newR; }
          return r;
        });
      }
    };
    document.addEventListener('keydown', arrowUpHandler);
    return () => document.removeEventListener('keydown', arrowUpHandler);
    // eslint-disable-next-line
  }, []);
  function isInsideBoundary (box: Box3) {
    return box.min.x >= BOUNDARY_MIN_X
      && box.max.x <= BOUNDARY_MAX_X;
  }
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z = MathUtils.degToRad(rotation);
    }
  });
}
