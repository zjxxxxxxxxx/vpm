export function debounce<Fn extends (...args: any[]) => any>(fn: Fn, delay = 300) {
  let timer: number | undefined;
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = undefined;
      fn(...args);
    }, delay);
  };
}
