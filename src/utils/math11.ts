export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function toFixedNumber(value: number, decimals: number): number {
  return Number(value.toFixed(decimals));
}
