import { createContext, createElement, useContext, useMemo } from 'react';
import { type MergeDispatch, useMergeState } from '@/hooks/useMergeState';

export type StoreProvider<Value extends object> = React.FC<
  React.PropsWithChildren<{
    initialValue?: Value;
  }>
>;

export type Store<Value extends object> = {
  useState(): [Value, MergeDispatch<Value>];
  useValue(): Value;
  useDispatch(): MergeDispatch<Value>;
};

export function createStore<Value extends object>(
  defaultValue: Value,
  useInit?: (initialValue: Value) => void,
) {
  const _StoreContext = createContext<[Value, MergeDispatch<Value>]>([defaultValue, () => {}]);

  const _StoreRunInit: React.FC<{
    initialedValue: Value;
  }> = ({ initialedValue }) => {
    useInit?.(initialedValue);
    return null;
  };

  const _StoreProvider: StoreProvider<Value> = ({ initialValue, children }) => {
    const initialedValue = useMemo(() => initialValue ?? defaultValue, []);
    return createElement(_StoreContext.Provider, {
      value: useMergeState(initialedValue),
      children: [
        createElement(_StoreRunInit, {
          initialedValue,
        }),
        children,
      ],
    });
  };

  const _Store: Store<Value> = {
    useState() {
      return useContext(_StoreContext);
    },
    useValue() {
      return useContext(_StoreContext)[0];
    },
    useDispatch() {
      return useContext(_StoreContext)[1];
    },
  };

  return [_StoreProvider, _Store] as const;
}
