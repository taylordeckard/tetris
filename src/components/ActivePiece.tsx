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
  const [nextBag, setNextBag] = useState(getBag());
  const [bagIdx, setBagIdx] = useState(0);
  const [nextLetter, setNextLetter] = useState(indexLetterMap[bag[bagIdx + 1]]);
  const reset = useGravity(ref, nextLetter);
  usePositionControls(ref, indexLetterMap[bag[bagIdx]], reset);
  useEffect(() => {
    if (reset >= 1) {
      props.onLock?.(ref.current?.clone());
    }
    if (reset !== 0) {
      const nextBagIdx = bagIdx + 1;
      if (nextBagIdx + 1 === bag.length) {
        setNextLetter(indexLetterMap[nextBag[0]]);
      }
      if (nextBagIdx === bag.length) {
        setBag(nextBag);
        setNextBag(getBag())
        setBagIdx(0);
      } else {
        setBagIdx(nextBagIdx);
        setNextLetter(indexLetterMap[bag[nextBagIdx]]);
      }
    }
    // eslint-disable-next-line
  }, [reset]);

  return tetrominos[bag[bagIdx]];
}

export const ActivePiece = forwardRef(AP);
