import { useId, useMemo } from 'react';
import { snake } from '@/utils/snake';

export function useIds<Base extends string, const Subs extends readonly string[] = []>(
  base: Base,
  subs?: Subs,
) {
  const id = useId();

  return useMemo(() => {
    const baseId = `_${snake(base)}${id}`;
    const subIds = (subs ?? []).reduce(
      (acc, sub) => {
        acc[sub] = `${baseId}${snake(sub)}_`;
        return acc;
      },
      {} as Record<string, string>,
    );

    return [baseId, subIds] as const as Subs extends readonly []
      ? readonly [string, Record<never, never>]
      : readonly [string, Record<Subs[number], string>];
  }, [base, subs]);
}
