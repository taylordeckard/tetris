import { ActivePiece } from './ActivePiece';
import { StateContext } from 'State';
import { PlayfieldGrid } from './PlayfieldGrid';
import { LockedPieces } from './LockedPieces';
import { useCallback, useContext, useState } from 'react';
import { Object3D } from 'three';

export function Playfield () {
  const { state } = useContext(StateContext);
  const [lastLocked, setLastLocked] = useState<Object3D>();

  const [activePiece, setActivePiece] = useState<Object3D>();
  const handleActivePiece = useCallback((obj: Object3D) => {
    setActivePiece(obj);
  }, []);

  return (
    <>
      <PlayfieldGrid/>
      {
        state.started && 
        <>
          <ActivePiece
            activePiece={activePiece}
            ref={handleActivePiece}
            onLock={piece => setLastLocked(piece)}/>
          <LockedPieces lastLocked={lastLocked} />
        </>
      }
    </>
  );
}
