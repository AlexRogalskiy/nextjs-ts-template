import cacheFn from './cacheFn';

describe('cacheFn', () => {
  test('should work for normal data', () => {
    const fn = jest.fn((x: number) => x + 3);
    const cachedFn = cacheFn(50000, fn);
    cachedFn(2);
    cachedFn(2);
    expect(fn).toHaveBeenCalledTimes(1);
    cachedFn(3);
    expect(fn).toHaveBeenCalledTimes(2);
  });
  test('should work for promises', async () => {
    const fn = jest.fn(
      (x: number): Promise<number> =>
        new Promise((resolve, reject) =>
          x % 2 === 0 ? resolve(x) : reject('some reason'),
        ),
    );
    const cachedFn = cacheFn(50000, fn);
    await cachedFn(2);
    await cachedFn(2);
    expect(fn).toHaveBeenCalledTimes(1);
    try {
      await cachedFn(3);
    } catch (e) {}
    expect(fn).toHaveBeenCalledTimes(2);
    try {
      await cachedFn(3);
    } catch (e) {}
    expect(fn).toHaveBeenCalledTimes(3);
  });
  test('should call the function again after some time', async () => {
    jest.useFakeTimers();
    const fn = jest.fn((x: number) => x + 3);
    const cachedFn = cacheFn(0, fn);
    cachedFn(2);
    await new Promise((resolve) => {
      setTimeout(() => {
        cachedFn(2);
        resolve(true);
      }, 5);
      jest.runAllTimers();
    });
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
