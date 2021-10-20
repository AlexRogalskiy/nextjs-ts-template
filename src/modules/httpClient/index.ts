import { NotFoundError } from '@/modules/error';
import logger from '../logger';

export type Get<T> = (url: string) => Promise<T>;

const get = async <T>(url: string): Promise<T> => {
  logger.info(`Fetching from: ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new NotFoundError(response.statusText || `Error fetching: ${url}`);
  }
  return response.json();
};

const httpClient = {
  get,
};

export default httpClient;
