import { CubeGeometry } from './CubeGeometry';
export function TetrominoZ () {
  const ys = [0,1];
  const color = 'red';
  return (
    <group position={[-6, 0, 0]}>
      <mesh castShadow position={[-1,1,-0.5]}>
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
      <mesh castShadow position={[1,0,-0.5]}>
        <CubeGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}
