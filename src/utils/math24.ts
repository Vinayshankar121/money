export function normalize(value: number, minValue: number, maxValue: number): number {
  if (maxValue === minValue) {
    return 0;
  }
  return (value - minValue) / (maxValue - minValue);
}

export function denormalize(value: number, minValue: number, maxValue: number): number {
  return minValue + value * (maxValue - minValue);
}
