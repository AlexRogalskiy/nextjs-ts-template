import jsDelivrAdapter from './jsDelivrAdapter';
import CurrenciesService from './currenciesService';

export type { Currencies, CurrencyDetail } from './types';

export const currenciesService = CurrenciesService(jsDelivrAdapter);
