/** Deterministic 0–1 value from an integer seed (used for particle layout / motion). */
export function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

export function fixed(n: number, decimals = 4) {
  return Number(n.toFixed(decimals));
}
