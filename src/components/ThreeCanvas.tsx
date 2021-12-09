import { Canvas} from '@react-three/fiber';
import { useContext } from 'react';
import { Ground } from './Ground';
import { Lighting } from './Lighting';
import { OrbitControls } from './OrbitControls';
import { Playfield } from './Playfield';
import { StateContext } from '../StateProvider';

export function ThreeCanvas () {
  const { state, dispatch } = useContext(StateContext);
  return (
    <Canvas
      camera={{ position: [0, 7.5, 15], }}
      style={{ height: '100vh' }}
      shadows
    >
      <color args={[0x242424]} attach="background"/>
      <StateContext.Provider value={{ state, dispatch }}>
        <OrbitControls/>
        <Lighting/>
        <Playfield/>
        <Ground/>
      </StateContext.Provider>
    </Canvas>
  );
}
