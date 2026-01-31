export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function inverseLerp(start: number, end: number, value: number): number {
  if (start === end) {
    return 0;
  }
  return (value - start) / (end - start);
}
