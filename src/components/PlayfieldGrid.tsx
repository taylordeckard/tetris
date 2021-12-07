import { BufferGeometry, Line, Vector3 } from 'three';
import { Object3DNode, extend } from '@react-three/fiber';
import {
  BOUNDARY_MAX_X,
  BOUNDARY_MAX_Y,
  BOUNDARY_MIN_X,
  BOUNDARY_MIN_Y,
} from '../constants';

extend({ Line_: Line });
declare global {
  namespace JSX {
    interface IntrinsicElements {
      line_: Object3DNode<Line, typeof Line>
    }
  }
}

export function PlayfieldGrid () {
  const rowPoints = []
  for (let i = 0; i < 18; i++) {
    rowPoints.push(new Vector3(BOUNDARY_MIN_X, BOUNDARY_MIN_Y + (i * 1), -0.5));
    rowPoints.push(new Vector3(BOUNDARY_MAX_X, BOUNDARY_MIN_Y + (i * 1), -0.5));
    rowPoints.push(new Vector3(BOUNDARY_MAX_X, BOUNDARY_MIN_Y + 1 + (i * 1), -0.5));
    rowPoints.push(new Vector3(BOUNDARY_MIN_X, BOUNDARY_MIN_Y + 1 + (i * 1), -0.5));
    rowPoints.push(new Vector3(BOUNDARY_MIN_X, BOUNDARY_MIN_Y + (i * 1), -0.5));
  }

  const colPoints = [];
  for (let i = 0; i < 10; i++) {
    colPoints.push(new Vector3(BOUNDARY_MIN_X + (i * 1), BOUNDARY_MIN_Y, -0.5));
    colPoints.push(new Vector3(BOUNDARY_MIN_X + (i * 1), BOUNDARY_MAX_Y, -0.5));
    colPoints.push(new Vector3(BOUNDARY_MIN_X + (i * 1), BOUNDARY_MAX_Y, -0.5));
    colPoints.push(new Vector3(BOUNDARY_MIN_X + (i * 1), BOUNDARY_MIN_Y, -0.5));
    colPoints.push(new Vector3(BOUNDARY_MIN_X + (i * 1), BOUNDARY_MIN_Y, -0.5));
  }

  const rowGeometry = new BufferGeometry().setFromPoints(rowPoints)
  const colGeometry = new BufferGeometry().setFromPoints(colPoints)
  return (
    <>
      <line_ geometry={rowGeometry}>
        <lineBasicMaterial
          attach="material"
          color={'#FFFFFF'}
          linewidth={10}
          linecap={'round'}
          linejoin={'round'} />
      </line_>
      <line_ geometry={colGeometry}>
        <lineBasicMaterial
          attach="material"
          color={'#FFFFFF'}
          linewidth={10}
          linecap={'round'}
          linejoin={'round'} />
      </line_>
    </>
  );
}
