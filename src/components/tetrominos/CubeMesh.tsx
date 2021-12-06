import { CubeGeometry } from './CubeGeometry';
import { Vector3 } from 'three';

export function CubeMesh (props: {
  position: Vector3;
  color: string | number;
}) {
  return (
    <mesh castShadow position={props.position}>
      <CubeGeometry />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}
