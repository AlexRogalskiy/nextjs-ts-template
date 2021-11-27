type LoggerFn = <T>(data: T, message?: string) => void;

export interface Logger {
  info: LoggerFn;
  warn: LoggerFn;
  fatal: LoggerFn;
}
