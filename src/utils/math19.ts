export function isPrime(value: number): boolean {
  const n = Math.floor(value);
  if (n <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(n); i += 1) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

export function nextPrime(value: number): number {
  let n = Math.max(2, Math.floor(value));
  while (!isPrime(n)) {
    n += 1;
  }
  return n;
}
