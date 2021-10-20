import { replace } from './string';

describe('replace', () => {
  test('should work when passing 3 params', () => {
    expect(replace('superman', 'super', 'bat')).toEqual('batman');
  });
  test('should work when passing 2 params', () => {
    expect(replace('super', 'bat')('superman')).toEqual('batman');
  });
  test('should work when passing 1 param', () => {
    expect(replace('super')('bat')('superman')).toEqual('batman');
  });
});
