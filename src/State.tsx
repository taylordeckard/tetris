import { createContext, Dispatch, useCallback, useReducer } from 'react';
import { Object3D } from 'three';

interface State {
  currentTetromino: string;
  level: number;
  linesCleared: number;
  lockedObjects: Object3D[];
  nextTetromino: string;
  score: number;
}

export enum ActionType {
  UPDATE_LOCKED_OBJECTS,
  UPDATE_CURRENT_TETROMINO,
  UPDATE_NEXT_TETROMINO,
  UPDATE_SCORE,
  UPDATE_LEVEL,
  UPDATE_LINES_CLEARED,
}

export interface Action {
  type: ActionType;
  payload: any;
}

const initialState: State = {
  currentTetromino: '',
  level: 0,
  linesCleared: 0,
  lockedObjects: [],
  nextTetromino: '',
  score: 0,
};

export const StateContext = createContext<{
  state: typeof initialState,
  dispatch?: Dispatch<Action>,
}>({
  state: initialState,
  dispatch: undefined,
});

const Provider = StateContext.Provider;

export const StateProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const reducerFn = useCallback((oldState: State, action: Action) => {
    const newState = {...oldState};
    switch (action.type) {
    case ActionType.UPDATE_CURRENT_TETROMINO:
      newState.currentTetromino = action.payload;
      break;
    case ActionType.UPDATE_LOCKED_OBJECTS:
      newState.lockedObjects = action.payload;
      break;
    case ActionType.UPDATE_NEXT_TETROMINO:
      newState.nextTetromino = action.payload;
      break
    case ActionType.UPDATE_SCORE:
      newState.score = action.payload;
      break
    case ActionType.UPDATE_LEVEL:
      newState.level = action.payload;
      break
    case ActionType.UPDATE_LINES_CLEARED:
      newState.linesCleared = action.payload;
      break
    default:
    }
    return newState;
  }, []);
  const [state, dispatch] = useReducer(reducerFn, initialState);
  return (
    <Provider value={{ state, dispatch }}>
      {children}
    </Provider>
  );
};
