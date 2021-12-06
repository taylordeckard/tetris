export function Lighting () {
  return (
    <>
      <pointLight
        castShadow
        position={[-2, 10, 10]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        intensity={1}
      />
      <ambientLight intensity={0.5}/>
    </>
  );
}
