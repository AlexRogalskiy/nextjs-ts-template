import pino from 'pino';

const logger = pino({
  enabled: process.env.NODE_ENV !== 'test',
  browser: {
    asObject: true,
  },
});

export default logger;
