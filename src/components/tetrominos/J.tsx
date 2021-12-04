import { CubeGeometry } from './CubeGeometry';
export function TetrominoJ () {
  const ys = [0,1,2];
  const color = 'blue';
  return (
    <group>
      <mesh castShadow position={[-1,0,-0.5]}>
        <CubeGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
    {
      ys.map(y => (
        <mesh key={y} castShadow position={[0, y, -0.5]}>
          <CubeGeometry />
          <meshStandardMaterial color={color} />
        </mesh>
      ))
    }
    </group>
  );
}
