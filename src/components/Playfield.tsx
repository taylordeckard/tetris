import { ActivePiece } from './ActivePiece';
import { PlayfieldGrid } from './PlayfieldGrid';
import { useRef } from 'react';
import { Mesh, Vector3 } from 'three';

export function Playfield () {
  const activePiece = useRef<Mesh>();
  return (
    <>
      <PlayfieldGrid/>
      <ActivePiece position={new Vector3(0, 12, 0)} ref={activePiece}/>
    </>
  );
}
