export function snake(str: string) {
  return str.replace(/([A-Z])/g, (_, s, i) => (!!i ? `_${s.toLowerCase()}` : s.toLowerCase()));
}
