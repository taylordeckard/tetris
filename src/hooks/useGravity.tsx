import { useCallback, useContext, useEffect, useState } from 'react';
import { ActionType, StateContext } from 'State';
import { useFrame } from '@react-three/fiber';
import { Box3, Object3D } from 'three';
import {
  BOUNDARY_MIN_Y,
  TMINO_STARTING_Y_MAP,
  LEVEL_SPEED,
} from '../constants';
import { roundTenth } from 'utils';

export function useGravity (activePiece?: Object3D) {
  const { state, dispatch } = useContext(StateContext);
  const [y, setY] = useState(16.5);
  const [resetPiece, setResetPiece] = useState(0);
  const [keyPressed, setKeyPressed] = useState(false);
  const [locking, setLocking] = useState(false);
  const [endGameCheck, setEndGameCheck] = useState(false);
  const [pause, setPause] = useState(false);
  const [frame, setFrame] = useState(0);
  const [speed, setSpeed] = useState(48);

  const intersectsFloor = useCallback(() => {
    const box = new Box3();
    if (activePiece) {
      box.setFromObject(activePiece);
      const roundedMinY = roundTenth(box.min.y);
      const boundaryMinY = BOUNDARY_MIN_Y - 1;
      const intersects = roundedMinY <= boundaryMinY;
      return intersects;
    }
    return false;
  }, [activePiece]);

  const intersectsLocked = useCallback(() => {
    return [...(activePiece?.children ?? [])].some(mesh => {
      const mBox = new Box3();
      mBox.setFromObject(mesh);
      return state.lockedObjects.some(obj => {
        const box = new Box3();
        box.setFromObject(obj);
        const boxX = roundTenth((roundTenth(box.min.x) + roundTenth(box.max.x)) / 2);
        const meshX = roundTenth((roundTenth(mBox.min.x) + roundTenth(mBox.max.x)) / 2);
        const roundedBoxMinY = roundTenth(box.min.y);
        const roundedMeshMinY = roundTenth(mBox.min.y);
        const intersects = meshX === boxX && roundedBoxMinY === roundedMeshMinY;
        return intersects;
      });
    })
  }, [activePiece, state]);

  const movePieceDown = useCallback((forceY?: number, endGameCheck?: boolean) => {
    if (activePiece) {
      activePiece.position.y = forceY ?? y;
      if (intersectsFloor() || intersectsLocked()) {
        activePiece.position.y = (forceY ?? y) + 1;
        setResetPiece(resetPiece + 1);
        setY(TMINO_STARTING_Y_MAP[state.nextTetromino]);
        if (endGameCheck) {
          dispatch?.({ type: ActionType.END_GAME });
        }
        return true;
      }
      setEndGameCheck(false);
    }
    return false;
  }, [
    activePiece,
    dispatch,
    intersectsFloor,
    intersectsLocked,
    resetPiece,
    state,
    y,
  ]);

  useEffect(() => {
    if (activePiece) {
      setY(TMINO_STARTING_Y_MAP[activePiece.name]);
      setEndGameCheck(true);
    }
  }, [activePiece]);

  useEffect(() => {
    const onPKey = (event: KeyboardEvent) => {
      if (event.key === 'p') {
        setPause(p => !p);
      }
    }
    document.addEventListener('keydown', onPKey);
    return () => document.removeEventListener('keydown', onPKey);
  }, []);

  useEffect(() => {
    const onDownArrowDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' && !pause) {
        setY(y => y - 1);
        setKeyPressed(true);
      }
    }
    document.addEventListener('keydown', onDownArrowDown);
    return () => document.removeEventListener('keydown', onDownArrowDown);
  }, [pause]);

  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === ' ') {
        setKeyPressed(false);
      }
    }
    document.addEventListener('keyup', onKeyUp);
    return () => document.removeEventListener('keyup', onKeyUp);
  }, []);

  useEffect(() => {
    const onSpaceDown = (event: KeyboardEvent) => {
      if (event.key === ' ' && !pause) {
        setLocking(true);
      }
    }
    document.addEventListener('keydown', onSpaceDown);
    return () => document.removeEventListener('keydown', onSpaceDown);
  }, [activePiece, movePieceDown, pause]);

  useEffect(() => {
    if (locking) {
      if (activePiece) {
        for (let i = 0; i < 20; i++) {
          if (movePieceDown(activePiece.position.y - 1, false)) {
            break;
          }
        }
      }
    }
    // eslint-disable-next-line
  }, [locking]);

  useEffect(() => {
    setLocking(false);
  }, [y]);

  useEffect(() => {
    dispatch?.({ type: ActionType.UPDATE_PAUSE, payload: pause });
  }, [pause, dispatch]);

  useEffect(() => {
    if (frame === speed && !keyPressed && !pause) {
      setY(y => y - 1);
    }
    // eslint-disable-next-line
  }, [frame]);

  useEffect(() => {
    setSpeed(speed => LEVEL_SPEED[state.level] ?? 1);
  }, [state.level])

  useFrame(() => {
    if (frame >= speed) {
      setFrame(0);
    } else {
      setFrame(frame + 1);
    }
    if (!locking && !pause) {
      movePieceDown(undefined, endGameCheck);
    }
  });

  return resetPiece;
}
