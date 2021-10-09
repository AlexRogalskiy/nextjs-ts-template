import getCurrenciesMap, { CurrenciesMap } from './getCurrenciesMap';
import getConversionsMap from './getConversionsMap';
import { Adapter, Currencies } from '../../types';

const currenciesMapToList = (currenciesMap: CurrenciesMap) => {
  const initial: Currencies = [];
  return Object.keys(currenciesMap).reduce(
    (acc, curr) => [...acc, { key: curr, name: currenciesMap[curr] }],
    initial,
  );
};

const jsDelivrAdapter: Adapter = {
  list: async () => {
    const currenciesMap = await getCurrenciesMap();
    return currenciesMapToList(currenciesMap);
  },
  get: async (key: string) => {
    const currenciesMap = await getCurrenciesMap();
    const conversionsMap = await getConversionsMap();
    return {
      key,
      name: currenciesMap[key],
      value: conversionsMap[key],
    };
  },
};

export default jsDelivrAdapter;
