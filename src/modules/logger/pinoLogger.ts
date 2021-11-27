import pino from 'pino';

const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

const isTest = process.env.NODE_ENV === 'test';

const pinoLogger = pino({
  enabled: !isTest,
  browser: isBrowser
    ? {
        asObject: true,
      }
    : undefined,
});

export default pinoLogger;
