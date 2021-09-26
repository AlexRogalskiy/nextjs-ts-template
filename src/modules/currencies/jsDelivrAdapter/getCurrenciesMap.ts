import fs from 'fs';
import { promisify } from 'util';
import { cacheFn } from '@modules/cache';
import logger from '@modules/logger';
import { InternalError, NotFoundError } from '@modules/error';
import CONFIG from './config';

const readFile = promisify(fs.readFile);

export type CurrenciesMap = Record<string, string>;

let latestValidMap: CurrenciesMap;

const fetchCurrencies = async (): Promise<CurrenciesMap> => {
  logger.info('Fetching currencies');
  const response = await fetch(`${CONFIG.baseURL}${CONFIG.currencies.url}`);
  if (!response.ok) {
    throw new NotFoundError('Error fetching currencies');
  }
  return response.json();
};

const getSavedCurrencies = (): CurrenciesMap => {
  if (latestValidMap) {
    return latestValidMap;
  }
  throw new NotFoundError('Error fetching latest valid currencies');
}

const getStoredCurrencies = (): Promise<CurrenciesMap> =>
  readFile(
    CONFIG.conversions.fallbackFile,
    'utf-8',
  ).then(
    (response) => JSON.parse(response)
  ).catch((e) => {
    throw new InternalError('Could not read fallback currencies');
  });

const getFallbackCurrencies = async (): Promise<CurrenciesMap> => {
  try {
    const savedCurrencies = getSavedCurrencies();
    return savedCurrencies;
  } catch (e) {
    logger.warn(e);
    const storedCurrencies = await getStoredCurrencies();
    return storedCurrencies;
  }
}

const getCurrenciesMap = cacheFn(CONFIG.currencies.expiry, async () => {
  try {
    const latestCurrencies = await fetchCurrencies();
    latestValidMap = latestCurrencies;
    return latestCurrencies;
  } catch (e) {
    logger.warn(e);
    const fallbackCurrencies = await getFallbackCurrencies();
    return fallbackCurrencies;
  }
});

export default getCurrenciesMap;
