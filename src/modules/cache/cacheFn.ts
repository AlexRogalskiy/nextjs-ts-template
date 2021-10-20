import * as R from 'remeda';

export type CachedFn<A, R> = (...args: A[]) => R;

interface CacheItem<R> {
  updatedTime: number;
  data: R;
}

const makeIsExpired =
  (expiry: number) =>
  <R>(item: CacheItem<R>) => {
    const currentDate = Date.now();
    return currentDate - item.updatedTime > expiry;
  };

const buildCacheItem = <R>(data: R) => ({
  updatedTime: Date.now(),
  data,
});

const cacheFn = <F extends CachedFn<any, any>>(expiry: number, fn: F) => {
  let cacheMap: Record<string, CacheItem<ReturnType<F>>> = {};
  const isExpired = makeIsExpired(expiry);

  return (...args: Parameters<F>) => {
    const key = JSON.stringify(args);
    if (!cacheMap[key] || isExpired(cacheMap[key])) {
      const data = fn(...args);

      cacheMap = R.set(cacheMap, key, buildCacheItem(data));

      if (R.isPromise(data)) {
        data.catch((e: Error) => {
          cacheMap = R.omit(cacheMap, [key]);
          return e;
        });
      }
    }

    return cacheMap[key].data;
  };
};

export default cacheFn;
