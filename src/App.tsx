import { ScoreDisplay, ThreeCanvas } from 'components';
import { StateProvider } from 'State';

function App() {
  return (
    <StateProvider>
      <ThreeCanvas/>
      <ScoreDisplay/>
    </StateProvider>
  );
}

export default App;
