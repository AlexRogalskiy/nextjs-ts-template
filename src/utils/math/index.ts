import * as R from 'remeda';

/**
 * divide
 */
const _divide = (a: number, b: number) => a / b;

export function divide(a: number, b: number): number;
export function divide(a: number): {
  (b: number): number;
};

export function divide() {
  return R.purry(_divide, arguments);
}

/**
 * dividePer
 */
const _dividePer = (a: number, b: number) => b / a;

export function dividePer(a: number, b: number): number;
export function dividePer(a: number): {
  (b: number): number;
};

export function dividePer() {
  return R.purry(_dividePer, arguments);
}

/**
 * multiply
 */
const _multiply = (a: number, b: number) => a * b;

export function multiply(a: number, b: number): number;
export function multiply(a: number): {
  (b: number): number;
};

export function multiply() {
  return R.purry(_multiply, arguments);
}
