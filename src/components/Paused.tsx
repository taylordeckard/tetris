import { useContext } from 'react';
import { ActionType, StateContext } from 'State';

export function Paused () {
  const { state, dispatch } = useContext(StateContext);

  return (
    <>
    {
      state.paused &&
      <div className="content-wrapper">
        <div className="content__title">Paused</div>
        <button onClick={() => dispatch?.({
          type: ActionType.UPDATE_PAUSE,
          payload: false,
        })}>Resume</button>
      </div>
    }
    </>
  );
}
