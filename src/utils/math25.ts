export function signum(value: number): number {
  if (value === 0) {
    return 0;
  }
  return value > 0 ? 1 : -1;
}

export function nearlyEqual(a: number, b: number, epsilon = 1e-6): boolean {
  return Math.abs(a - b) <= epsilon;
}
