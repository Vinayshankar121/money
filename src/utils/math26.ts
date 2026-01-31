export function radiansPerSecondToRPM(value: number): number {
  return (value * 60) / (2 * Math.PI);
}

export function rpmToRadiansPerSecond(value: number): number {
  return (value * 2 * Math.PI) / 60;
}
