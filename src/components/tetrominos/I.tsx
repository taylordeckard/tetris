import { CubeMesh } from './CubeMesh';
import { forwardRef } from 'react';
import { Vector3 } from 'three';
import { nextId } from '../../utils';

function I (props: { position: Vector3; }, ref: any) {
  const ys = [0,1,2,3];
  return (
    <group position={props.position} ref={ref}>
      {
        ys.map((y, idx) => (
          <CubeMesh key={nextId('I-')}
            position={new Vector3(0, y, -0.5)}
            color={0x3DE4E5}/>
        ))
      }
    </group>
  );
}

export const TetrominoI = forwardRef(I);
