import * as R from 'remeda';
import { multiply, divide, dividePer } from '@/modules/utils';

const FACTOR = 1000000;

const getReversedConversion = R.createPipe(
  dividePer(1),
  multiply(FACTOR),
  Math.round,
  divide(FACTOR),
);

export default getReversedConversion;
