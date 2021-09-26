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
      <pre>
        <code>{JSON.stringify(currencies, null, 2)}</code>
      </pre>
    )}
  </div>
);

export default Home;
