import { createContext, Dispatch, useReducer } from 'react';
import { Object3D } from 'three';

const initialState:{
  lockedObjects: Object3D[];
} = {
  lockedObjects: [],
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
