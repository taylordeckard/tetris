import { useContext, useEffect, useState } from 'react';
import { StateContext } from 'State';
import { useFrame } from '@react-three/fiber';
import { Box3, Object3D } from 'three';
import {
  BOUNDARY_MIN_Y,
  TMINO_STARTING_Y_MAP,
} from '../constants';

export function useGravity (activePiece?: Object3D) {
  const { state } = useContext(StateContext);
  const [y, setY] = useState(16.5);
  const [resetPiece, setResetPiece] = useState(0);
  const [resetGravity, setResetGravity] = useState(0);
  const [downKeyPressed, setDownKeyPressed] = useState(false);
  const [pause, setPause] = useState(false);
  const SPEED = 500;

  useEffect(() => {
    if (activePiece) {
      setY(TMINO_STARTING_Y_MAP[activePiece.name]);
    }
  }, [activePiece]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause && !downKeyPressed) {
        setY(y => y - 1);
      }
    }, SPEED);
    return () => clearInterval(interval);
  }, [pause, resetGravity, downKeyPressed]);

  useEffect(() => {
    const onPKey = (event: KeyboardEvent) => {
      if (event.key === 'p') {
        setPause(p => !p);
        setResetGravity(g => g + 1);
      }
    }
    document.addEventListener('keydown', onPKey);
    return () => document.removeEventListener('keydown', onPKey);
  }, []);

  useEffect(() => {
    const onDownArrowDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        setY(y => y - 1);
        setDownKeyPressed(true);
      }
    }
    document.addEventListener('keydown', onDownArrowDown);
    return () => document.removeEventListener('keydown', onDownArrowDown);
  }, []);

  useEffect(() => {
    const onDownArrowUp = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        setDownKeyPressed(false);
      }
    }
    document.addEventListener('keyup', onDownArrowUp);
    return () => document.removeEventListener('keydown', onDownArrowUp);
  }, []);

  function intersectsFloor () {
    const box = new Box3();
    if (activePiece) {
      box.setFromObject(activePiece);
      const roundedMinY = Math.round(box.min.y * 10) / 10;
      const boundaryMinY = BOUNDARY_MIN_Y - 1;
      const intersects = roundedMinY <= boundaryMinY;
      return intersects;
    }
    return false;
  }

  function intersectsLocked () {
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
        return intersects;
      });
    })
  }

  useFrame(() => {
    if (activePiece) {
      activePiece.position.y = y;
      if (intersectsFloor() || intersectsLocked()) {
        activePiece.position.y = y + 1;
        setResetPiece(resetPiece + 1);
        setY(TMINO_STARTING_Y_MAP[state.nextTetromino]);
      }
    }
  });

  return resetPiece;
}
