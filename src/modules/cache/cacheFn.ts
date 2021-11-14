import * as R from 'remeda';
import logger from '../logger';
import makeCache from './makeCache';

export type CachedFn<A, R> = (...args: A[]) => R;

const cacheFn = <F extends CachedFn<any, any>>(expiry: number, fn: F) => {
  const cache = makeCache<ReturnType<F>>(expiry, 200);

  return (...args: Parameters<F>) => {
    const key = JSON.stringify(args);
    const cachedValue = cache.get(key);

    if (!cachedValue) {
      const data: ReturnType<F> = fn(...args);
      cache.set(key, data);
      if (R.isPromise(data)) {
        data.catch((e: Error) => {
          cache.remove(key);
          return e;
        });
      }
      return data;
    }
    logger.info(`Cache retrieved "${fn.name}" with key: ${key}"`);
    return cachedValue;
  };
};

export default cacheFn;
