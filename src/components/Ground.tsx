import { DoubleSide, MathUtils } from 'three';
export function Ground () {
  return (
    <mesh
      rotation-x={MathUtils.degToRad(90)}
      position={[0,-0.5,0]}
      receiveShadow={true}>
      <planeGeometry args={[100,100]} />
      <meshStandardMaterial color="grey" side={DoubleSide} />
    </mesh>
  );
}
