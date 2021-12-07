import { CubeMesh } from './CubeMesh';
import { forwardRef } from 'react';
import { Vector3 } from 'three';
import { nextId } from '../../utils';

function O (props: { position: Vector3; }, ref: any) {
  const xs = [-0.5,0.5];
  const ys = [-0.5,0.5];
  const color = 0xFEFF44;
  return (
    <group position={props.position} ref={ref} name="O">
    {
      ys.flatMap(y => xs.map(x => (
        <CubeMesh key={nextId('O-')} position={new Vector3(x, y, -0.5)} color={color}/>
      )))
    }
    </group>
  );
}

export const TetrominoO = forwardRef(O);
