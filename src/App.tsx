import { ScoreDisplay, ThreeCanvas } from 'components';
import { StateContext, StateProvider } from 'State';
import { Title } from 'components';

function App() {
  return (
    <StateProvider>
      <ThreeCanvas/>
      <ScoreDisplay/>
      <StateContext.Consumer>
        { value => !value.state.started ? <Title/> : <></> }
      </StateContext.Consumer>
    </StateProvider>
  );
}

export default App;
