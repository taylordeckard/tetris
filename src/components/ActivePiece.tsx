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
import { StateContext } from '../StateProvider';
import { useCallback, useContext, useEffect, useMemo, forwardRef, useState } from 'react';
import { Group, Vector3 } from 'three';
import { useGravity, usePositionControls, useRotationControls } from '../hooks';
import { ActionType } from '../StateProvider';

function AP (props: {
  position?: Vector3;
  onLock?: (g: Group) => void;
}, ref: any) {
  const { dispatch } = useContext(StateContext);
  useRotationControls(ref);
  const indexLetterMap = useCallback(idx => ['I', 'J', 'L', 'O', 'S', 'Z', 'T'][idx], []);
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
  const reset = useGravity(ref);
  usePositionControls(ref, indexLetterMap(bag[bagIdx]), reset);
  useEffect(() => {
    dispatch?.({ type: ActionType.UPDATE_CURRENT_TETROMINO, payload: indexLetterMap(bag[0]) });
    dispatch?.({ type: ActionType.UPDATE_NEXT_TETROMINO, payload: indexLetterMap(bag[1]) });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (reset >= 1) {
      props.onLock?.(ref.current?.clone());
    }
    if (reset !== 0) {
      const nextBagIdx = bagIdx + 1;
      if (nextBagIdx === bag.length) {
        setBag(nextBag);
        setNextBag(getBag())
        setBagIdx(0);
      } else {
        setBagIdx(nextBagIdx);
      }
    }
    // eslint-disable-next-line
  }, [reset]);
  useEffect(() => {
    if (reset !== 0) {
      dispatch?.({
        type: ActionType.UPDATE_CURRENT_TETROMINO,
        payload: indexLetterMap(bag[bagIdx]),
      });
      const nextIdx = bagIdx + 1;
      if (nextIdx === bag.length) {
        dispatch?.({
          type: ActionType.UPDATE_NEXT_TETROMINO,
          payload: indexLetterMap(nextBag[0]),
        });
      } else {
        dispatch?.({
          type: ActionType.UPDATE_NEXT_TETROMINO,
          payload: indexLetterMap(bag[nextIdx]),
        });
      }
    }
    // eslint-disable-next-line
  }, [bagIdx]);

  return tetrominos[bag[bagIdx]];
}

export const ActivePiece = forwardRef(AP);
