import { Canvas } from '@react-three/fiber';
import {
  Ground,
  Lighting,
  OrbitControls,
} from './components';
import {
  TetrominoI,
  TetrominoJ,
  TetrominoL,
  TetrominoO,
  TetrominoS,
  TetrominoT,
  TetrominoZ,
} from './components/tetrominos';

function App() {
  return (
    <Canvas
      style={{ height: '100vh' }}
      shadows
    >
      <color args={[0x242424]} attach="background"/>
      <OrbitControls/>
      <Lighting/>
      <TetrominoZ/>
      <TetrominoI/>
      <TetrominoJ/>
      <TetrominoL/>
      <TetrominoO/>
      <TetrominoS/>
      <TetrominoT/>
      <Ground/>
    </Canvas>
  );
}

export default App;
