import { ActivePiece } from './ActivePiece';
import { PlayfieldGrid } from './PlayfieldGrid';
import { LockedPieces } from './LockedPieces';
import { useCallback, useState } from 'react';
import { Object3D } from 'three';

export function Playfield () {
  const [lastLocked, setLastLocked] = useState<Object3D>();

  const [activePiece, setActivePiece] = useState<Object3D>();
  const handleActivePiece = useCallback((obj: Object3D) => {
    setActivePiece(obj);
  }, []);

  return (
    <>
      <PlayfieldGrid/>
      <ActivePiece
        activePiece={activePiece}
        ref={handleActivePiece}
        onLock={piece => setLastLocked(piece)}/>
      <LockedPieces lastLocked={lastLocked} />
    </>
  );
}
