export function Lighting () {
  return (
    <>
      {/*<hemisphereLight args={[0xFFFFFF, 0x555555, 1]}/>*/}
      <pointLight
        castShadow
        position={[0, 10, 10]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        intensity={1}
      />
      <ambientLight intensity={0.5}/>
    </>
  );
}
