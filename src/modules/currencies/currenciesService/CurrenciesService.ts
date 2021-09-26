import { Adapter } from '../types';

const CurrenciesService = (adapter: Adapter) => ({
  listCurrencies: () => adapter.list(),
  getCurrencyDetail: (key: string) => adapter.get(key),
  listCurrenciesKeys: async () => {
    const currencies = await adapter.list();
    return currencies.map(({ key }) => key);
  },
});

export default CurrenciesService;
