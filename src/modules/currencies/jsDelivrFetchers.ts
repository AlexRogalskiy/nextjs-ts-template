import * as R from 'remeda';
import httpClient, { HttpClient } from '@/modules/httpClient';
import { replace } from '@/utils/string';

/**
 * CONFIG
 */

const BASE_URL =
  'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/%DATE%';
const DEFAULT_DATE = 'latest';
const URLS = {
  currencies: `${BASE_URL}/currencies.min.json`,
  conversions: `${BASE_URL}/currencies/%CURRENCY%.min.json`,
};

/**
 * HELPERS
 */
const dateReplacer = (x?: string) =>
  R.pipe(x || DEFAULT_DATE, replace('%DATE%'));
const currencyReplacer = replace('%CURRENCY%');

/**
 * CURRENCIES
 */
export type CurrenciesMap = Record<string, string>;

export const getCurrenciesParsedURL = (dateStr?: string) =>
  R.pipe(URLS.currencies, dateReplacer(dateStr));

export const fetchCurrencies = R.createPipe(getCurrenciesParsedURL, (url) =>
  httpClient.get<CurrenciesMap>(url),
);

/**
 * CONVERSIONS
 */

export type ConversionsMap = Record<string, number>;

export const getConversionsParsedURL = (
  currencyKey: string,
  dateStr?: string,
) =>
  R.pipe(
    URLS.conversions,
    currencyReplacer(currencyKey),
    dateReplacer(dateStr),
  );

export const fetchConversions = (currencyKey: string, dateStr?: string) =>
  httpClient.get<{
    date: string;
    [currencyKey: string]: ConversionsMap | string;
  }>(getConversionsParsedURL(currencyKey, dateStr));
