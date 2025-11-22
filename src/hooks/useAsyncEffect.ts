import { useEffect } from 'react';

export function useAsyncEffect(effect: () => Promise<void> | void, deps?: React.DependencyList) {
  useEffect(() => {
    effect();
  }, deps);
}
