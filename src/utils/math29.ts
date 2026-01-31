export function slope(x1: number, y1: number, x2: number, y2: number): number {
  if (x2 === x1) {
    return 0;
  }
  return (y2 - y1) / (x2 - x1);
}

export function intercept(m: number, x: number, y: number): number {
  return y - m * x;
}
