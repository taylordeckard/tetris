import { MutableRefObject, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box3, Group } from 'three';

const startingXMap: { [key: string]: number } = {
  I: 0,
  J: 0.5,
  L: 0.5,
  O: 0,
  S: 0.5,
  T: 0.5,
  Z: 0.5,
};

export function usePositionControls (
  ref: MutableRefObject<Group>,
  pieceLetter: string,
  reset: number,
) {
  const [xOffset, setXOffset] = useState(0);
  useEffect(() => {
    setXOffset(startingXMap[pieceLetter]);
  }, [pieceLetter, reset]);
  useEffect(() => {
    const arrowRightLeftHandler = (event: KeyboardEvent) => {
      const box = new Box3();
      box.setFromObject(ref.current);
      if (event.key === 'ArrowLeft') {
        setXOffset(x => x - 1);
      }
      if (event.key === 'ArrowRight') {
        setXOffset(x => x + 1);
      }
    };
    document.addEventListener('keydown', arrowRightLeftHandler);
    return () => document.removeEventListener('keydown', arrowRightLeftHandler);
    // eslint-disable-next-line
  }, []);
  useFrame(() => {
    if (ref.current) {
      ref.current.position.x = xOffset;
    }
  });
}
