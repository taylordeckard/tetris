import {
  TetrominoI,
  TetrominoJ,
  TetrominoL,
  TetrominoO,
  TetrominoS,
  TetrominoZ,
  TetrominoT,
} from '../components/tetrominos';
import { getBag, nextId } from '../utils';
import { useEffect, useMemo, forwardRef, useState } from 'react';
import { Group, Vector3 } from 'three';
import { useGravity, usePositionControls, useRotationControls } from '../hooks';

function AP (props: {
  position?: Vector3;
  onLock?: (g: Group) => void;
}, ref: any) {
  useRotationControls(ref);
  const indexLetterMap = ['I', 'J', 'L', 'O', 'S', 'Z', 'T'];
  const tetrominos = useMemo(() => {
    const tetrominoProps = { ref: ref };
    return [
      <TetrominoI key={nextId('ap-')} {...tetrominoProps}/>,
      <TetrominoJ key={nextId('ap-')} {...tetrominoProps}/>,
      <TetrominoL key={nextId('ap-')} {...tetrominoProps}/>,
      <TetrominoO key={nextId('ap-')} {...tetrominoProps}/>,
      <TetrominoS key={nextId('ap-')} {...tetrominoProps}/>,
      <TetrominoZ key={nextId('ap-')} {...tetrominoProps}/>,
      <TetrominoT key={nextId('ap-')} {...tetrominoProps}/>,
    ];
  }, [ref]);
  const [bag, setBag] = useState(getBag());
  const [bagIdx, setBagIdx] = useState(0);
  const reset = useGravity(ref, indexLetterMap[bag[bagIdx + 1]]);
  usePositionControls(ref, indexLetterMap[bag[bagIdx]], reset);
  useEffect(() => {
    if (reset >= 1) {
      props.onLock?.(ref.current?.clone());
    }
    if (bagIdx + 1 === bag.length) {
      setBag(getBag());
      setBagIdx(0);
    } else {
      setBagIdx(bagIdx + 1);
    }
    // eslint-disable-next-line
  }, [reset]);

  return tetrominos[bag[bagIdx]];
}

export const ActivePiece = forwardRef(AP);
