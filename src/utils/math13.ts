export function variance(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const squaredDiffs = values.map((value) => (value - avg) ** 2);
  return squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
}

export function stdDev(values: number[]): number {
  return Math.sqrt(variance(values));
}
