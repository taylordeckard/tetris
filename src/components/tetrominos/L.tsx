import { CubeMesh } from './CubeMesh';
import { forwardRef } from 'react';
import { Vector3 } from 'three';
import { nextId } from '../../utils';

function L (props: { position: Vector3; }, ref: any) {
  const ys = [0,1,2];
  const color = 0xFD8800;
  return (
    <group position={props.position} ref={ref}>
      <CubeMesh position={new Vector3(1, 0, -0.5)} color={color}/>
    {
      ys.map(y => (
        <CubeMesh key={nextId('L-')} position={new Vector3(0, y, -0.5)} color={color}/>
      ))
    }
    </group>
  );
}

export const TetrominoL = forwardRef(L);
