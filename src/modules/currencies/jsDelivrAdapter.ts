import * as R from 'remeda';
import { cacheFn, getHoursToExpiry, withResolvedFallback } from '../cache';
import {
  fetchCurrencies,
  fetchConversions,
  CurrenciesMap,
  ConversionsMap,
} from './jsDelivrFetchers';
import { Adapter, Currencies } from './types';

const CONFIG = {
  currencies: {
    expiry: getHoursToExpiry(6),
    fn: fetchCurrencies,
  },
  conversions: {
    expiry: getHoursToExpiry(1),
    fn: fetchConversions,
  },
} as const;

// currencies

const getListFromCurrenciesMap = (currenciesMap: CurrenciesMap): Currencies =>
  R.pipe(
    currenciesMap,
    R.toPairs,
    R.map(([key, name]) => ({
      key,
      name,
    })),
  );

const enhancedFetchCurrencies = withResolvedFallback(
  cacheFn(CONFIG.currencies.expiry, CONFIG.currencies.fn),
);

const getCurrencies: Adapter['getCurrencies'] = async (dateStr?) => {
  try {
    const currenciesMap = await enhancedFetchCurrencies(dateStr);
    return getListFromCurrenciesMap(currenciesMap);
  } catch (e) {
    throw e;
  }
};

// conversions

const enhancedFetchConversions = withResolvedFallback(
  cacheFn(CONFIG.conversions.expiry, CONFIG.conversions.fn),
);

const getConversions: Adapter['getConversions'] = async (key, dateStr?) => {
  try {
    const conversions = await enhancedFetchConversions(key, dateStr);
    return {
      key,
      date: conversions.date,
      conversions: conversions[key] as ConversionsMap,
    };
  } catch (e) {
    throw e;
  }
};

// detail

const getDetail: Adapter['getDetail'] = async (key, dateStr?) => {
  try {
    const [currenciesMap, conversions] = await Promise.all([
      enhancedFetchCurrencies(dateStr),
      getConversions(key, dateStr),
    ]);
    return {
      key,
      name: currenciesMap[key],
      date: conversions.date,
      conversions: conversions.conversions,
    };
  } catch (e) {
    throw e;
  }
};

// adapter

const jsDelivrAdapter: Adapter = {
  getCurrencies,
  getConversions,
  getDetail,
};

export default jsDelivrAdapter;
