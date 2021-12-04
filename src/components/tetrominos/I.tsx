import { CubeGeometry } from './CubeGeometry';
export function TetrominoI () {
  const ys = [0,1,2,3];
  return (
    <group position={[-3, 0, 0]}>
      {
        ys.map(y => (
          <mesh castShadow position={[0, y, -0.5]}>
            <CubeGeometry/>
            <meshStandardMaterial color="lightblue" />
          </mesh>
        ))
      }
    </group>
  );
}
