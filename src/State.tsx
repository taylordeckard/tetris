import { createContext, Dispatch, useCallback, useReducer } from 'react';
import { Object3D } from 'three';
import { getCache, setCache } from 'utils';

interface State {
  camera: 'perspective' | 'orthographic';
  currentTetromino: string;
  highScore: number;
  level: number;
  linesCleared: number;
  lockedObjects: Object3D[];
  nextTetromino: string;
  paused: boolean;
  score: number;
  started: boolean;
}

export enum ActionType {
  END_GAME,
  START_GAME,
  TOGGLE_CAMERA,
  UPDATE_CURRENT_TETROMINO,
  UPDATE_LEVEL,
  UPDATE_LINES_CLEARED,
  UPDATE_LOCKED_OBJECTS,
  UPDATE_NEXT_TETROMINO,
  UPDATE_PAUSE,
  UPDATE_SCORE,
}

export interface Action {
  type: ActionType;
  payload?: any;
}

const getInitialState: () => State = () => {
  const cache = getCache();
  return {
    camera: cache?.camera ?? 'perspective',
    currentTetromino: '',
    highScore: cache?.highScore ?? 0,
    level: 0,
    linesCleared: 0,
    lockedObjects: [],
    nextTetromino: '',
    paused: false,
    score: 0,
    started: false,
  };
};

export const StateContext = createContext<{
  state: State,
  dispatch?: Dispatch<Action>,
}>({
  state: getInitialState(),
  dispatch: undefined,
});

const Provider = StateContext.Provider;

export const StateProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const reducerFn = useCallback((oldState: State, action: Action) => {
    let newState = {...oldState};
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
    case ActionType.UPDATE_PAUSE:
      newState.paused = action.payload;
      break
    case ActionType.START_GAME:
      newState = getInitialState();
      newState.started = true;
      break
    case ActionType.END_GAME:
      newState.started = false;
      newState.highScore = Math.max(oldState.highScore, oldState.score);
      setCache({ highScore: newState.highScore });
      break
    case ActionType.TOGGLE_CAMERA:
      if (newState.camera === 'perspective') {
        newState.camera = 'orthographic';
      } else {
        newState.camera = 'perspective';
      }
      setCache({ camera: newState.camera });
      break
    default:
    }
    return newState;
  }, []);
  const [state, dispatch] = useReducer(reducerFn, getInitialState());
  return (
    <Provider value={{ state, dispatch }}>
      {children}
    </Provider>
  );
};
