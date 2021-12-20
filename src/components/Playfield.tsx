import { ActivePiece } from './ActivePiece';
import { ColumnHighlight } from './ColumnHighlight';
import { StateContext } from 'State';
import { PlayfieldGrid } from './PlayfieldGrid';
import { LockedPieces } from './LockedPieces';
import { NextPiece } from './NextPiece';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Object3D } from 'three';

export function Playfield () {
  const { state } = useContext(StateContext);
  const [lastLocked, setLastLocked] = useState<Object3D>();

  const [activePiece, setActivePiece] = useState<Object3D>();
  const handleActivePiece = useCallback((obj: Object3D) => {
    setActivePiece(obj);
  }, []);

  useEffect(() => {
    if (!state.started) {
      setLastLocked(undefined);
    }
  }, [state]);

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
          <ColumnHighlight activePiece={activePiece}/>
          <LockedPieces lastLocked={lastLocked} />
          <NextPiece />
        </>
      }
    </>
  );
}
