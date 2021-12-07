import { ActivePiece } from './ActivePiece';
import { PlayfieldGrid } from './PlayfieldGrid';
import { LockedPieces } from './LockedPieces';
import { useRef, useState } from 'react';
import { Group } from 'three';

export function Playfield () {
  const activePiece = useRef<Group>();
  const [lastLocked, setLastLocked] = useState<Group>();
  return (
    <>
      <PlayfieldGrid/>
      <ActivePiece ref={activePiece} onLock={(lockedPiece) => setLastLocked(lockedPiece)}/>
      <LockedPieces lastLocked={lastLocked} />
    </>
  );
}
