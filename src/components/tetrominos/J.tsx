import { forwardRef } from 'react';
import { CubeMesh } from './CubeMesh';
import { Vector3 } from 'three';
import { nextId } from 'utils';

function J (props: { position?: Vector3; }, ref: any) {
  const ys = [-1,0,1];
  const color = 'blue';
  return (
    <group position={props.position} ref={ref} name="J">
      <CubeMesh position={new Vector3(-1, -1, -0.5)} color={color}/>
    {
      ys.map(y => (
        <CubeMesh key={nextId('J-')} position={new Vector3(0, y, -0.5)} color={color}/>
      ))
    }
    </group>
  );
}

export const TetrominoJ = forwardRef(J);
