import { Shape } from 'three';

export function CubeGeometry () {
  const extrudeSettings = {
    steps: 1,
    depth: 1,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 1
  };
  const shape = new Shape();
  shape.moveTo(-0.4, -0.4);
  shape.lineTo(-0.4, 0.4);
  shape.lineTo(0.4, 0.4);
  shape.lineTo(0.4, -0.4);
  shape.lineTo(-0.4, -0.4);
  return (
    <extrudeGeometry args={[shape, extrudeSettings]}/>
  );
}
