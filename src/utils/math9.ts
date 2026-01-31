export function factorial(value: number): number {
  if (value < 0) {
    return 0;
  }
  let result = 1;
  for (let i = 2; i <= Math.floor(value); i += 1) {
    result *= i;
  }
  return result;
}

export function triangular(value: number): number {
  const n = Math.max(0, Math.floor(value));
  return (n * (n + 1)) / 2;
}
