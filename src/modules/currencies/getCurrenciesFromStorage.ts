import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

import { Currencies } from './types';
import { InternalError } from '@/modules/error';

const FILE_PATH = path.join(process.cwd(), '/public/fallbackCurrencies.json');

const readFile = promisify(fs.readFile);

const getCurrenciesFromStorage = async (): Promise<Currencies> => {
  try {
    const response = await readFile(FILE_PATH, 'utf-8');
    return JSON.parse(response);
  } catch (e) {
    throw new InternalError('Could not read fallback currencies');
  }
};

export default getCurrenciesFromStorage;
