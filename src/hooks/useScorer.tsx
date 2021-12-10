import { useCallback, useContext } from 'react';
import { ActionType, StateContext } from 'State';

export function useScorer () {
  const { state, dispatch } = useContext(StateContext);
  const clearLines = useCallback((numCleared: number) => {
    const scoreMap: { [key: number]: number } = { 1: 40, 2: 100, 3: 300, 4: 1200 };
    const totalLinesCleared = state.linesCleared + numCleared;
    const score = (state.level + 1) * scoreMap[numCleared] + state.score;
    const level = Math.floor(totalLinesCleared / 10);
    dispatch?.({ type: ActionType.UPDATE_LINES_CLEARED, payload: totalLinesCleared });
    dispatch?.({ type: ActionType.UPDATE_SCORE, payload: score });
    dispatch?.({ type: ActionType.UPDATE_LEVEL, payload: level });
  }, [dispatch, state]);

  return { clearLines };
}
