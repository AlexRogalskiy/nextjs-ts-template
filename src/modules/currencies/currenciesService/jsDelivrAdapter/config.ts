import path from 'path';
const hoursToExpiry = (hours: number) => hours * 60 * 60 * 1000;

const CONFIG = {
  baseURL: 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest',
  currencies: {
    url: '/currencies.json',
    expiry: hoursToExpiry(6),
  },
  conversions: {
    url: '/currencies/eur.json',
    expiry: hoursToExpiry(1),
    fallbackFile: path.join(process.cwd(), '/public/fallbackCurrencies.json'),
  },
} as const;

export default CONFIG;
