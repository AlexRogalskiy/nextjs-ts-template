import CurrenciesService from './CurrenciesService';
import jsDelivrAdapter from './jsDelivrAdapter';

const currenciesService = CurrenciesService(jsDelivrAdapter);

export default currenciesService;
