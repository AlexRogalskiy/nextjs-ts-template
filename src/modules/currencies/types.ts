export interface Currency {
  key: string;
  name: string;
}

export interface CurrencyDetail extends Currency {
  date: string;
  conversions: Record<string, number>;
}

export type CurrencyConversions = Omit<CurrencyDetail, 'name'>;

export type Currencies = ReadonlyArray<Currency>;

export interface Adapter {
  getCurrencies: (dateStr?: string) => Promise<Currencies>;
  getConversions: (
    key: string,
    dateStr?: string,
  ) => Promise<CurrencyConversions>;
  getDetail: (key: string, dateStr?: string) => Promise<CurrencyDetail>;
}
