import { CubeMesh } from './CubeMesh';
import { forwardRef } from 'react';
import { Vector3 } from 'three';
import { nextId } from '../../utils';

function Z (props: { position?: Vector3; }, ref: any) {
  const ys = [0,1];
  const color = 'red';
  return (
    <group position={props.position} ref={ref} name="Z">
      <CubeMesh position={new Vector3(-1, 1, -0.5)} color={color}/>
    {
      ys.map(y => (
        <CubeMesh key={nextId('Z-')} position={new Vector3(0, y, -0.5)} color={color}/>
      ))
    }
      <CubeMesh position={new Vector3(1, 0, -0.5)} color={color}/>
    </group>
  );
}

export const TetrominoZ = forwardRef(Z);
