import { complement, isEmpty } from 'ramda';
import { cacheFn } from '@modules/cache';
import logger from '@modules/logger';
import { InternalError, NotFoundError } from '@modules/error';
import CONFIG from './config';

const isNotEmpty = complement(isEmpty);

export type ConversionsMap = Record<string, number>;

let latestValidMap: ConversionsMap;

const fetchConversions = async (): Promise<ConversionsMap> => {
  logger.info('Fetching conversions');
  const response = await fetch(`${CONFIG.baseURL}${CONFIG.conversions.url}`);
  if (!response.ok) {
    throw new NotFoundError('Error fetching conversions');
  }
  return response.json();
};

const getConversionsMap = cacheFn(CONFIG.conversions.expiry, async () => {
  try {
    const latestConversions = await fetchConversions();
    if (isNotEmpty(latestConversions)) {
      latestValidMap = latestConversions;
      return latestConversions;
    }
    throw new NotFoundError('Error fetching conversions');
  } catch (e) {
    logger.warn(e);
    if (isNotEmpty(latestValidMap)) {
      return latestValidMap;
    }
    logger.info('latestValidMap is empty for conversions');
    throw new InternalError('Could not return conversions');
  }
});

export default getConversionsMap;
