import { createContext, createElement, useCallback, useContext, useMemo, useState } from 'react';

export type StoreAction<State extends object> = Partial<State> | ((state: State) => Partial<State>);

export type StoreDispatch<State extends object> = (action: StoreAction<State>) => void;

export type StoreProvider<State extends object> = React.FC<
  React.PropsWithChildren<{
    initialState?: State;
  }>
>;

export type StoreHook<State extends object> = {
  useState(): readonly [State, StoreDispatch<State>];
  useStateValue(): State;
  useDispatch(): StoreDispatch<State>;
};

export function createStore<State extends object>(
  defaultState: State,
  useEffectHook?: (initialedState: State) => void,
) {
  const _StoreContext = createContext<readonly [State, StoreDispatch<State>]>([
    defaultState,
    () => {},
  ]);

  const _StoreRunEffectHook: React.FC<{
    initialedState: State;
  }> = ({ initialedState }) => {
    useEffectHook?.(initialedState);
    return null;
  };

  const _StoreProvider: StoreProvider<State> = ({ initialState, children }) => {
    const initialedState = useMemo(() => initialState ?? defaultState, []);
    const [state, setState] = useState(initialedState);
    const dispatch = useCallback((action: StoreAction<State>) => {
      setState((state) => ({
        ...state,
        ...(typeof action === 'function' ? action(state) : action),
      }));
    }, []);

    return createElement(_StoreContext.Provider, {
      value: useMemo(() => [state, dispatch] as const, [state]),
      children: [
        createElement(_StoreRunEffectHook, {
          initialedState,
        }),
        children,
      ],
    });
  };

  const _StoreHook: StoreHook<State> = {
    useState() {
      return useContext(_StoreContext);
    },
    useStateValue() {
      return useContext(_StoreContext)[0];
    },
    useDispatch() {
      return useContext(_StoreContext)[1];
    },
  };

  return [_StoreProvider, _StoreHook] as const;
}
