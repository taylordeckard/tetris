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
import { useEffect, forwardRef, useState } from 'react';
import { Vector3 } from 'three';

function AP (props: {
  position: Vector3,
  reset: number,
}, ref: any) {
  const tetrominoProps = {
    position: props.position,
    ref: ref,
  };
  const tetrominos = [
    <TetrominoI key={nextId('ap-')} {...tetrominoProps}/>,
    <TetrominoJ key={nextId('ap-')} {...tetrominoProps}/>,
    <TetrominoL key={nextId('ap-')} {...tetrominoProps}/>,
    <TetrominoO key={nextId('ap-')} {...tetrominoProps}/>,
    <TetrominoS key={nextId('ap-')} {...tetrominoProps}/>,
    <TetrominoZ key={nextId('ap-')} {...tetrominoProps}/>,
    <TetrominoT key={nextId('ap-')} {...tetrominoProps}/>,
  ];
  const getRandomIdx = () => Math.floor(Math.random() * tetrominos.length);
  const [randIdx, setRandIdx] = useState(getRandomIdx);
  useEffect(() => {
    setRandIdx(getRandomIdx())
  }, [props.reset]);
  return tetrominos[randIdx];
}

export const ActivePiece = forwardRef(AP);
