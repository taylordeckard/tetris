import { useContext } from 'react';
import { ActionType, StateContext } from 'State';
import 'styles/title.css';

export function Title () {
  const { dispatch } = useContext(StateContext);

  return (
    <div className="title-wrapper">
      <div className="title">
        <span>T</span>
        <span>E</span>
        <span>T</span>
        <span>R</span>
        <span>I</span>
        <span>S</span>
      </div>
      <button onClick={() => dispatch?.({ type: ActionType.START_GAME })}>Play</button>
    </div>
  );
}
