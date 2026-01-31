export function addN(...values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

export function multiplyN(...values: number[]): number {
  return values.length === 0 ? 0 : values.reduce((total, value) => total * value, 1);
}
