import { Canvas} from '@react-three/fiber';
import {
  Ground,
  Lighting,
  OrbitControls,
  Playfield,
} from './components';

function App() {
  return (
    <Canvas
      camera={{ position: [0, 7.5, 15], }}
      style={{ height: '100vh' }}
      shadows
    >
      <color args={[0x242424]} attach="background"/>
      <OrbitControls/>
      <Lighting/>
      <Playfield/>
      <Ground/>
    </Canvas>
  );
}

export default App;
