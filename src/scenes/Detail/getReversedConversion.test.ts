import getReversedConversion from './getReversedConversion';

describe('getReversedConversion', () => {
  test('should return the fraction', () => {
    expect(getReversedConversion(6)).toBe(0.166667);
  });
});
