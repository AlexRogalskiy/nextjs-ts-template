import {
  getCurrenciesParsedURL,
  getConversionsParsedURL,
} from './jsDelivrFetchers';

describe('getCurrenciesParsedURL', () => {
  test('should work with date', () => {
    expect(getCurrenciesParsedURL('2021-10-12')).toEqual(
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/2021-10-12/currencies.min.json',
    );
  });
  test('should work without date', () => {
    expect(getCurrenciesParsedURL()).toEqual(
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json',
    );
  });
});

describe('getConversionsParsedURL', () => {
  test('should work with date', () => {
    expect(getConversionsParsedURL('ada', '2021-10-12')).toEqual(
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/2021-10-12/currencies/ada.min.json',
    );
  });
  test('should work without date', () => {
    expect(getConversionsParsedURL('ada')).toEqual(
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/ada.min.json',
    );
  });
});
