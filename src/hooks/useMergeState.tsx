import { useReducer } from 'react';

export type MergeAction<State extends object> = Partial<State> | ((state: State) => Partial<State>);

export type MergeDispatch<State extends object> = (action: MergeAction<State>) => void;

export function useMergeState<State extends object>(value: State) {
  return useReducer(reducer, value) as [State, MergeDispatch<State>];
}

function reducer<State extends object>(state: State, action: MergeAction<State>) {
  return {
    ...state,
    ...(typeof action === 'function' ? action(state) : action),
  };
}
