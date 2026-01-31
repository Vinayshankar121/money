export function percentOf(part: number, whole: number): number {
  return whole === 0 ? 0 : (part / whole) * 100;
}

export function percentageChange(oldValue: number, newValue: number): number {
  return oldValue === 0 ? 0 : ((newValue - oldValue) / oldValue) * 100;
}
