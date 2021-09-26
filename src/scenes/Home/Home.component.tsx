import type { NextPage } from 'next';
import Head from 'next/head';
import { Currencies } from '@modules/currencies';

export interface Props {
  currencies: Currencies;
  hasError?: boolean;
}

const Home: NextPage<Props> = ({ currencies, hasError }) => (
  <div>
    {hasError ? (
      <div>There was an error</div>
    ) : (
      <ul>
        {currencies.map(({ key, name }) => (
          <li key={key}>
            <span>{key}</span>
            <span>{name}</span>
          </li>
        ))}
        <code>{JSON.stringify(currencies, null, 2)}</code>
      </ul>
    )}
  </div>
);

export default Home;
