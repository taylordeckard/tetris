import { createContext, Dispatch, useReducer } from 'react';
import { Box3 } from 'three';

const initialState:{
  lockedBoxes: Box3[];
} = {
  lockedBoxes: [],
};

export const StateContext = createContext<{
  state: typeof initialState,
  dispatch?: Dispatch<typeof initialState>,
}>({
  state: initialState,
  dispatch: undefined,
});

export const StateProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer((
    state: typeof initialState,
    newState: typeof initialState,
  ) => {
    return newState;
  }, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
