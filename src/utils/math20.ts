export function sumRange(start: number, end: number): number {
  const from = Math.min(start, end);
  const to = Math.max(start, end);
  let total = 0;
  for (let i = from; i <= to; i += 1) {
    total += i;
  }
  return total;
}

export function countRange(start: number, end: number): number {
  return Math.abs(end - start) + 1;
}
