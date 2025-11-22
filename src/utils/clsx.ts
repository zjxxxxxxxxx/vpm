import { type ClassValue, clsx as clsxFn } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function clsx(...inputs: ClassValue[]) {
  return twMerge(clsxFn(...inputs));
}
