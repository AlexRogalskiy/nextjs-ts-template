type CachedFn<A, R> = (...args: A[]) => R;

const cacheFn = <F extends CachedFn<any, any>>(expiry: number, fn: F) => {
  let updatedTime = 0;
  let data: ReturnType<F>;
  return (...args: Parameters<F>) => {
    if (Date.now() - updatedTime <= expiry) {
      return data;
    }
    data = fn(...args);
    updatedTime = Date.now();
    return data;
  };
};

export default cacheFn;
