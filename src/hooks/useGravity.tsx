import { useCallback, useContext, useEffect, useState } from 'react';
import { ActionType, StateContext } from 'State';
import { useFrame } from '@react-three/fiber';
import { Box3, Object3D } from 'three';
import {
  BOUNDARY_MIN_Y,
  TMINO_STARTING_Y_MAP,
} from '../constants';

export function useGravity (activePiece?: Object3D) {
  const { state, dispatch } = useContext(StateContext);
  const [y, setY] = useState(16.5);
  const [resetPiece, setResetPiece] = useState(0);
  const [resetGravity, setResetGravity] = useState(0);
  const [keyPressed, setKeyPressed] = useState(false);
  const [locking, setLocking] = useState(false);
  const [endGameCheck, setEndGameCheck] = useState(false);
  const [pause, setPause] = useState(false);
  const SPEED = 500;

  const intersectsFloor = useCallback(() => {
    const box = new Box3();
    if (activePiece) {
      box.setFromObject(activePiece);
      const roundedMinY = Math.round(box.min.y * 10) / 10;
      const boundaryMinY = BOUNDARY_MIN_Y - 1;
      const intersects = roundedMinY <= boundaryMinY;
      if (intersects) { console.log({ roundedMinY, boundaryMinY, type: 'floor' }); }
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
        const boxX = Math.floor((Math.round(box.min.x) + Math.round(box.max.x)) / 2);
        const meshX = Math.floor((Math.round(mBox.min.x) + Math.round(mBox.max.x)) / 2);
        const roundedBoxMinY = (Math.round(box.min.y * 10) / 10);
        const roundedMeshMinY = (Math.round(mBox.min.y * 10) / 10);
        const intersects = meshX === boxX && roundedBoxMinY === roundedMeshMinY;
        if (intersects) { console.log({ boxX, meshX, roundedBoxMinY, roundedMeshMinY, type: 'locked' }); }
        return intersects;
      });
    })
  }, [activePiece, state]);

  const movePieceDown = useCallback((forceY?: number) => {
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
    endGameCheck,
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
    const interval = setInterval(() => {
      if (!pause && !keyPressed && !locking) {
        setY(y => y - 1);
      }
    }, SPEED);
    return () => clearInterval(interval);
  }, [pause, resetGravity, keyPressed, locking]);

  useEffect(() => {
    const onPKey = (event: KeyboardEvent) => {
      if (event.key === 'p') {
        setPause(p => {
          dispatch?.({ type: ActionType.UPDATE_PAUSE, payload: !p });
          return !p;
        });
        setResetGravity(g => g + 1);
      }
    }
    document.addEventListener('keydown', onPKey);
    return () => document.removeEventListener('keydown', onPKey);
  }, [dispatch]);

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
        setKeyPressed(true);
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
          if (movePieceDown(activePiece.position.y - 1)) {
            break;
          }
        }
        setLocking(false);
      }
    }
  }, [activePiece, movePieceDown, locking]);

  useFrame(() => {
    if (!locking) {
      movePieceDown();
    }
  });

  return resetPiece;
}
