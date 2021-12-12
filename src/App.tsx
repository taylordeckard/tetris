import { ScoreDisplay, ThreeCanvas } from 'components';
import { StateProvider } from 'State';
import { Paused, Title } from 'components';

function App() {
  return (
    <StateProvider>
      <ThreeCanvas/>
      <ScoreDisplay/>
      <Title/>
      <Paused/>
    </StateProvider>
  );
}

export default App;
