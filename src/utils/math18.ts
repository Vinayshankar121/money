export function scale(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  if (inMax === inMin) {
    return outMin;
  }
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}
