import { BrowserView, MobileView } from 'react-device-detect';
import { ScoreDisplay, ThreeCanvas } from 'components';
import { StateProvider } from 'State';
import { Paused, Title } from 'components';

function App() {
  return (
    <StateProvider>
      <BrowserView>
        <ThreeCanvas/>
        <ScoreDisplay/>
        <Title/>
        <Paused/>
      </BrowserView>
      <MobileView>
        <div className="mobile">
          <div>Sorry... Your device is not yet supported.</div>
        </div>
      </MobileView>
    </StateProvider>
  );
}

export default App;
