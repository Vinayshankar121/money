export function averageWeighted(values: number[], weights: number[]): number {
  if (values.length === 0 || values.length !== weights.length) {
    return 0;
  }
  let total = 0;
  let weightSum = 0;
  for (let i = 0; i < values.length; i += 1) {
    total += values[i] * weights[i];
    weightSum += weights[i];
  }
  return weightSum === 0 ? 0 : total / weightSum;
}
