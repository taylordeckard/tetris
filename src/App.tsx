import { Canvas} from '@react-three/fiber';
import {
  Ground,
  Lighting,
  OrbitControls,
  Playfield,
} from './components';
import { StateProvider } from './StateProvider';

function App() {
  return (
    <Canvas
      camera={{ position: [0, 7.5, 15], }}
      style={{ height: '100vh' }}
      shadows
    >
      <color args={[0x242424]} attach="background"/>
      <StateProvider>
        <OrbitControls/>
        <Lighting/>
        <Playfield/>
        <Ground/>
      </StateProvider>
    </Canvas>
  );
}

export default App;
