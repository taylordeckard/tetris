import { CubeMesh } from './CubeMesh';
import { forwardRef } from 'react';
import { Vector3 } from 'three';
import { nextId } from 'utils';

function S (props: { position?: Vector3; }, ref: any) {
  const ys = [0,1];
  const color = 0x43FE43;
  return (
    <group position={props.position} ref={ref} name="S">
      <CubeMesh position={new Vector3(-1, 0, -0.5)} color={color}/>
    {
      ys.map(y => (
        <CubeMesh key={nextId('S-')} position={new Vector3(0, y, -0.5)} color={color}/>
      ))
    }
      <CubeMesh position={new Vector3(1, 1, -0.5)} color={color}/>
    </group>
  );
}

export const TetrominoS = forwardRef(S);
