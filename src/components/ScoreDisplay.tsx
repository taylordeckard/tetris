import { useContext } from 'react';
import { ActionType, StateContext } from 'State';
import { ReactComponent as IconCameraSwitch } from 'icons/cameraswitch.svg';

export function ScoreDisplay () {
  const { state, dispatch } = useContext(StateContext);

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        color: 'white',
        fontSize: '32px',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        onClick={() => dispatch?.({ type: ActionType.TOGGLE_CAMERA })}
        style={{
          cursor: 'pointer',
          marginRight: '20px',
        }}>
        <IconCameraSwitch style={{ fill: 'white' }}/>
      </div>
      <div>Score: { state.score }</div>
    </div>
  );
}
