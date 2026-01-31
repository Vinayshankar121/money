export function abs(value: number): number {
  return Math.abs(value);
}

export function sign(value: number): number {
  return value === 0 ? 0 : value > 0 ? 1 : -1;
}
