export function mod(value: number, divisor: number): number {
  return divisor === 0 ? 0 : ((value % divisor) + divisor) % divisor;
}

export function isEven(value: number): boolean {
  return value % 2 === 0;
}
