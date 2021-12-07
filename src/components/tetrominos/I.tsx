import { CubeMesh } from './CubeMesh';
import { forwardRef } from 'react';
import { Vector3 } from 'three';
import { nextId } from '../../utils';

function I (props: { position?: Vector3; }, ref: any) {
  const ys = [-1.5,-0.5,0.5,1.5];
  return (
    <group position={props.position} ref={ref} name="I">
      {
        ys.map((y, idx) => (
          <CubeMesh key={nextId('I-')}
            position={new Vector3(0.5, y, -0.5)}
            color={0x3DE4E5}/>
        ))
      }
    </group>
  );
}

export const TetrominoI = forwardRef(I);
