import { ActivePiece } from './ActivePiece';
import { PlayfieldGrid } from './PlayfieldGrid';
import { LockedPieces } from './LockedPieces';
import { StateContext } from '../StateProvider';
import { useContext, useRef, useState } from 'react';
import { Group } from 'three';
import { getBoundingBoxes } from '../utils';

export function Playfield () {
  const { state, dispatch } = useContext(StateContext);
  const activePiece = useRef<Group>();
  const [lastLocked, setLastLocked] = useState<Group>();

  function onLock (lockedPiece: Group) {
    state.lockedBoxes.push(...getBoundingBoxes(lockedPiece));
    dispatch?.({ ...state });
    setLastLocked(lockedPiece);
  }

  return (
    <>
      <PlayfieldGrid/>
      <ActivePiece ref={activePiece} onLock={onLock}/>
      <LockedPieces lastLocked={lastLocked} />
    </>
  );
}
