import { useId, useMemo } from 'react';

export function useIds<Base extends string, const Subs extends string[] = []>(
  base: Base,
  subs?: Subs,
) {
  const id = useId();

  return useMemo(() => {
    const baseId = `${base}-${id}`;
    const subIds = (subs ?? []).reduce(
      (acc, sub) => {
        acc[sub] = `${base}-${sub}-${id}`;
        return acc;
      },
      {} as Record<string, string>,
    );

    return [baseId, subIds] as const as Subs extends []
      ? [string, Record<never, never>]
      : [string, Record<Subs[number], string>];
  }, [base, subs]);
}
