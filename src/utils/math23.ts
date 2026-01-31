export function clamp01(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}

export function saturate(value: number): number {
  return clamp01(value);
}
