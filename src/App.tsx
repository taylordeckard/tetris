import { MobileView } from 'react-device-detect';
import {
  ScoreDisplay,
  ThreeCanvas,
  Paused,
  Title,
  MobileControls,
  Music,
} from 'components';
import { StateProvider } from 'State';

function App() {
  return (
    <StateProvider>
      <ThreeCanvas/>
      <ScoreDisplay/>
      <Title/>
      <Paused/>
      <MobileView>
        <MobileControls/>
      </MobileView>
      <Music/>
    </StateProvider>
  );
}

export default App;
