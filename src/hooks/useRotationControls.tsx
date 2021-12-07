import { MutableRefObject, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';

export function useRotationControls (ref: MutableRefObject<Group>) {
  const [rotation, setRotation] = useState<number>(0);
  useEffect(() => {
    const arrowUpHandler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setRotation(r => r === 270 ? 0 : r + 90);
      }
    };
    document.addEventListener('keydown', arrowUpHandler);
    return () => document.removeEventListener('keydown', arrowUpHandler);
    // eslint-disable-next-line
  }, []);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z = MathUtils.degToRad(rotation);
    }
  });
}
