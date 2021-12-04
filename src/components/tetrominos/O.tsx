import { CubeGeometry } from './CubeGeometry';
export function TetrominoO () {
  const xs = [0,1];
  const ys = [0,1];
  const color = 'yellow';
  return (
    <group position={[5, 0, 0]}>
    {
      ys.flatMap(y => xs.map(x => (
        <mesh key={y} castShadow position={[x, y, -0.5]}>
          <CubeGeometry />
          <meshStandardMaterial color={color} />
        </mesh>
      )))
    }
    </group>
  );
}
