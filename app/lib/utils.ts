import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOrdinal(n) {
  let suffix = ['th', 'st', 'nd', 'rd'];
  let v = n % 100;
  return n + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
}