import { useContext } from 'react';
import { StateContext } from 'State';

export function ScoreDisplay () {
  const { state } = useContext(StateContext);

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        color: 'white',
        fontSize: '32px',
        userSelect: 'none',
      }}
    >
      <div>Score: { state.score }</div>
    </div>
  );
}
