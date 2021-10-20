import logger from '../logger';
import getCurrenciesFromStorage from './getCurrenciesFromStorage';
import { Adapter } from './types';

const CurrenciesService = (adapter: Adapter) => {
  const list = async () => {
    try {
      const currencies = await adapter.getCurrencies('latest');
      return currencies;
    } catch (e) {
      logger.warn(e);
      const currencies = await getCurrenciesFromStorage();
      return currencies;
    }
  };

  const listKeys = async () => {
    const currencies = await list();
    return currencies.map(({ key }) => key);
  };

  const getConversions = async (key: string, dateStr?: string) => {
    const conversions = await adapter.getConversions(key, dateStr);
    return conversions;
  };

  const getDetail = async (key: string, dateStr?: string) => {
    const detail = await adapter.getDetail(key, dateStr);
    return detail;
  };

  return {
    list,
    listKeys,
    getConversions,
    getDetail,
  };
};

export default CurrenciesService;
