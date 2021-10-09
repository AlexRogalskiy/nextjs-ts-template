import { andThen, map, pipe, prop } from 'ramda';
import { Adapter } from '../types';

const getKeyForEach = map(prop('key'));

const CurrenciesService = (adapter: Adapter) => ({
  listCurrencies: adapter.list,
  getCurrencyDetail: adapter.get,
  listCurrenciesKeys: pipe(adapter.list, andThen(getKeyForEach)),
});

export default CurrenciesService;
