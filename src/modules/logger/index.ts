import pinoLogger from './pinoLogger';
import { Logger } from './types';

const logger: Logger = {
  info: (...args) => pinoLogger.info(...args),
  warn: (...args) => pinoLogger.warn(...args),
  fatal: (...args) => pinoLogger.fatal(...args),
};

export default logger;
