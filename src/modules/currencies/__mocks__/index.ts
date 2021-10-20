export type { Currencies, CurrencyDetail, CurrencyConversions } from '../types';

import listData from './list.json';
import conversionsData from './conversions.json';

export const currenciesService = {
  list: jest.fn(() => Promise.resolve(listData)) as jest.Mock,
  listKeys: jest.fn(() =>
    Promise.resolve(listData.map(({ key }) => key)),
  ) as jest.Mock,
  getConversions: jest.fn((key: string, dateStr = 'latest') =>
    Promise.resolve({
      ...conversionsData,
      date: dateStr === 'latest' ? conversionsData.date : dateStr,
      key,
    }),
  ) as jest.Mock,
  getDetail: jest.fn((key: string, dateStr = 'latest') => {
    const foundItem = listData.find((listItem) => listItem.key === key);
    const selectedItem = foundItem || {
      key: 'eur',
      name: 'Euro',
    };
    return Promise.resolve({
      ...selectedItem,
      date: dateStr === 'latest' ? conversionsData.date : dateStr,
      conversions: conversionsData.conversions,
    });
  }) as jest.Mock,
};
