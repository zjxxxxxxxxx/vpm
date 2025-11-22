import { useEffect } from 'react';

const inertIDs = new Set<string>();

export function useInertRoot(id: string, inert: boolean) {
  useEffect(() => {
    const rootEl = document.getElementById('root')!;

    if (inert) {
      inertIDs.add(id);
      rootEl.inert = true;
    }

    return () => {
      if (inert) {
        inertIDs.delete(id);
        if (!inertIDs.size) {
          rootEl.inert = false;
        }
      }
    };
  }, [id, inert]);
}
