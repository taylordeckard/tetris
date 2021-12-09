import { ThreeCanvas } from './components';
import { StateProvider } from './StateProvider';

function App() {
  return (
    <StateProvider>
      <ThreeCanvas/>
    </StateProvider>
  );
}

export default App;
