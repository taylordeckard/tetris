import { useContext } from 'react';
import { ActionType, StateContext } from 'State';
import 'styles/title.css';

export function Title () {
  const { state, dispatch } = useContext(StateContext);

  return (
    <>
    {
      !state.started &&
      <div className="content-wrapper">
        <div className="title content__title">
          <span>T</span>
          <span>E</span>
          <span>T</span>
          <span>R</span>
          <span>I</span>
          <span>S</span>
        </div>
        <button onClick={() => dispatch?.({ type: ActionType.START_GAME })}>Play</button>
        {
          state.highScore > 0 &&
          <div className="high-score">High Score: { state.highScore }</div>
        }
      </div>
    }
    </>
  );
}
