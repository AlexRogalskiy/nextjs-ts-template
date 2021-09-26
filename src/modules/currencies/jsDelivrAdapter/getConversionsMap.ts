import { cacheFn } from '@modules/cache';
import logger from '@modules/logger';
import CONFIG from './config';

export type ConversionsMap = Record<string, number>;

let latestValidMap: ConversionsMap;

const fetchConversions = async (): Promise<ConversionsMap> => {
  logger.info('Fetching conversions');
  const response = await fetch(`${CONFIG.baseURL}${CONFIG.conversions.url}`);
  if (!response.ok) {
    throw new Error('CONVERSIONS_NOT_FOUND');
  }
  return response.json();
};

const getConversionsMap = cacheFn(CONFIG.conversions.expiry, async () => {
  try {
    const latestConversions = await fetchConversions();
    if (latestConversions && Object.keys(latestConversions).length) {
      latestValidMap = latestConversions;
      return latestConversions;
    }
    throw new Error('CONVERSIONS_NOT_FOUND');
  } catch (e) {
    logger.error(e, 'Conversions not found');
    if (latestValidMap && Object.keys(latestValidMap).length) {
      return latestValidMap;
    }
    logger.info('latestValidMap is empty for conversions');
    throw new Error('CONVERSIONS_ERROR');
  }
});

export default getConversionsMap;
