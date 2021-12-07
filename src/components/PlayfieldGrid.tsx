import { BufferGeometry, Line, Vector3 } from 'three';
import { Object3DNode, extend } from '@react-three/fiber';

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
    rowPoints.push(new Vector3(-5, -0.5 + (i * 1), -0.5));
    rowPoints.push(new Vector3(5, -0.5 + (i * 1), -0.5));
    rowPoints.push(new Vector3(5, 0.5 + (i * 1), -0.5));
    rowPoints.push(new Vector3(-5, 0.5 + (i * 1), -0.5));
    rowPoints.push(new Vector3(-5, -0.5 + (i * 1), -0.5));
  }

  const colPoints = [];
  for (let i = 0; i < 10; i++) {
    colPoints.push(new Vector3(-5 + (i * 1), -0.5, -0.5));
    colPoints.push(new Vector3(-5 + (i * 1), 17.5, -0.5));
    colPoints.push(new Vector3(-5 + (i * 1), 17.5, -0.5));
    colPoints.push(new Vector3(-5 + (i * 1), -0.5, -0.5));
    colPoints.push(new Vector3(-5 + (i * 1), -0.5, -0.5));
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
