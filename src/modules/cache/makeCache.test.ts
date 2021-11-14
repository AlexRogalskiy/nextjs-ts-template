import makeCache from './makeCache';

describe('makeCache', () => {
  test('must build an empty cache', () => {
    const cache = makeCache(500);
    expect(cache).toHaveProperty('get');
    expect(cache).toHaveProperty('set');
    expect(cache).toHaveProperty('flush');
  });
  test('must be able to perform basic operations', () => {
    const cache = makeCache(500);
    cache.set('a', 'a');
    expect(cache.get('a')).toBe('a');
    cache.flush();
    expect(cache.get('a')).toBeUndefined();
  });
  test('the cache store should maintain the maxLength when provided', () => {
    const cache = makeCache(500, 2);
    cache.set('a', 'a');
    cache.set('b', 'b');
    expect(cache.get('a')).toBe('a');
    expect(cache.get('b')).toBe('b');
    cache.set('c', 'c');
    expect(cache.get('a')).toBeUndefined();
  });
});
