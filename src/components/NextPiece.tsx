import { useContext, useRef } from 'react';
import { StateContext } from 'State';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Object3D } from 'three';
import {
  TetrominoI,
  TetrominoJ,
  TetrominoL,
  TetrominoO,
  TetrominoS,
  TetrominoT,
  TetrominoZ,
} from './tetrominos';

export function NextPiece () {
  const { state } = useContext(StateContext);
  const ref = useRef<Object3D>();

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x = 10;
      ref.current.position.y = 14.5;
      ref.current.position.z = -1;
      ref.current.rotation.x = MathUtils.degToRad(20);
      ref.current.rotation.y = MathUtils.degToRad(-20);
      ref.current.rotation.z += 0.01;
    }
  });

  switch (state.nextTetromino) {
  case 'I':
    return <TetrominoI ref={ref}/>
  case 'J':
    return <TetrominoJ ref={ref}/>
  case 'L':
    return <TetrominoL ref={ref}/>
  case 'O':
    return <TetrominoO ref={ref}/>
  case 'S':
    return <TetrominoS ref={ref}/>
  case 'T':
    return <TetrominoT ref={ref}/>
  case 'Z':
    return <TetrominoZ ref={ref}/>
  default:
    return <></>
  }

}
