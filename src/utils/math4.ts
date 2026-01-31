export function max(values: number[]): number {
  return values.length === 0 ? 0 : Math.max(...values);
}

export function min(values: number[]): number {
  return values.length === 0 ? 0 : Math.min(...values);
}
