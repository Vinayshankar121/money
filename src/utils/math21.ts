export function fibonacci(count: number): number[] {
  const n = Math.max(0, Math.floor(count));
  const sequence = [0, 1];
  if (n <= 1) {
    return sequence.slice(0, n + 1);
  }
  for (let i = 2; i <= n; i += 1) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}

export function fibSum(count: number): number {
  return fibonacci(count).reduce((total, value) => total + value, 0);
}
