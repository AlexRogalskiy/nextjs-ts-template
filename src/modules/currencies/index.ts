import jsDelivrAdapter from './jsDelivrAdapter';
import CurrenciesService from './currenciesService';

export type { Currencies, CurrencyDetail, CurrencyConversions } from './types';

export const currenciesService = CurrenciesService(jsDelivrAdapter);
