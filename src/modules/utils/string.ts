/**
 * replace
 */
const _replace = (a: string, b: string, c: string) => a.replace(b, c);

export function replace(a: string, b: string, c: string): string;
export function replace(
  a: string,
  b: string,
): {
  (c: string): string;
};
export function replace(a: string): {
  (b: string): {
    (c: string): string;
  };
};

export function replace(a: string, b?: string, c?: string) {
  if (b && c) {
    return _replace(a, b, c);
  }
  if (b) {
    return (d: string) => _replace(d, a, b);
  }
  return (d: string) => (e: string) => _replace(e, a, d);
}
