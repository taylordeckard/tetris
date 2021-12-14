import { Canvas} from '@react-three/fiber';
import { useContext } from 'react';
import { Ground } from './Ground';
import { Lighting } from './Lighting';
import { OrbitControls } from './OrbitControls';
import { Playfield } from './Playfield';
import { StateContext } from 'State';
import { OrthographicCamera, PerspectiveCamera } from '@react-three/drei';

export function ThreeCanvas () {
  const { state, dispatch } = useContext(StateContext);
  return (
    <Canvas
      style={{ height: '100vh' }}
      shadows
    >
      <PerspectiveCamera position={[0, 7.5, 15]} makeDefault={state.camera === 'perspective'} />
      <OrthographicCamera position={[0, 0, 5]} makeDefault={state.camera === 'orthographic'} />
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
