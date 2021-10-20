import { NotFoundError } from '@/modules/error';

type CachedFn<A, R> = (...args: A[]) => R;

const withResolvedFallback = <F extends CachedFn<any, any>>(fn: F) => {
  const cacheMap: Record<string, ReturnType<F>> = {};
  return (...args: Parameters<F>): ReturnType<F> => {
    const key = JSON.stringify(args);
    return fn(...args)
      .then((response: ReturnType<F>) => {
        cacheMap[key] = response;
        return response;
      })
      .catch(() => {
        if (!cacheMap[key]) {
          throw new NotFoundError('Could not found fallback data');
        }
        return cacheMap[key];
      });
  };
};

export default withResolvedFallback;
