export interface Currency {
  key: string;
  name: string;
}

export interface CurrencyDetail extends Currency {
  value: number;
}

export type Currencies = ReadonlyArray<Currency>;

export interface Adapter {
  list: () => Promise<Currencies>;
  get: (key: Currency['key']) => Promise<CurrencyDetail>;
}
