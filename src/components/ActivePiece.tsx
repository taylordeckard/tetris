import {
  TetrominoI,
  TetrominoJ,
  TetrominoL,
  TetrominoO,
  TetrominoS,
  TetrominoZ,
  TetrominoT,
} from '../components/tetrominos';
import { nextId } from '../utils';
import { useCallback, useEffect, useMemo, forwardRef, useState } from 'react';
import { Vector3 } from 'three';
import { useGravity, usePositionControls, useRotationControls } from '../hooks';

const indexLetterMap = ['I', 'J', 'L', 'O', 'S', 'Z', 'T'];

function AP (props: {
  position: Vector3,
}, ref: any) {
  useRotationControls(ref);
  const tetrominos = useMemo(() => {
    const tetrominoProps = {
      position: props.position,
      ref: ref,
    };
    return [
      <TetrominoI key={nextId('ap-')} {...tetrominoProps}/>,
      <TetrominoJ key={nextId('ap-')} {...tetrominoProps}/>,
      <TetrominoL key={nextId('ap-')} {...tetrominoProps}/>,
      <TetrominoO key={nextId('ap-')} {...tetrominoProps}/>,
      <TetrominoS key={nextId('ap-')} {...tetrominoProps}/>,
      <TetrominoZ key={nextId('ap-')} {...tetrominoProps}/>,
      <TetrominoT key={nextId('ap-')} {...tetrominoProps}/>,
    ];
  }, [props.position, ref]);
  const getRandomIdx = useCallback(() => {
    return Math.floor(Math.random() * tetrominos.length);
    // eslint-disable-next-line
  }, []);
  const [randIdx, setRandIdx] = useState(getRandomIdx());
  const [nextRandIdx, setNextRandIdx] = useState(getRandomIdx());
  const reset = useGravity(ref, indexLetterMap[nextRandIdx]);
  usePositionControls(ref, indexLetterMap[randIdx], reset);
  useEffect(() => {
    setRandIdx(nextRandIdx);
    setNextRandIdx(getRandomIdx());
    // eslint-disable-next-line
  }, [reset]);

  return tetrominos[randIdx];
}

export const ActivePiece = forwardRef(AP);
