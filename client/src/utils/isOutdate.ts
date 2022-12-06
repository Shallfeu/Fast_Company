export function isOutdate(date: number) {
  if (Date.now() - date > 60 * 10 * 100) return true;
  return false;
}
