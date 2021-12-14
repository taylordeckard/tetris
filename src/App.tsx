import { MobileView } from 'react-device-detect';
import { ScoreDisplay, ThreeCanvas } from 'components';
import { StateProvider } from 'State';
import { Paused, Title, MobileControls } from 'components';

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
    </StateProvider>
  );
}

export default App;
