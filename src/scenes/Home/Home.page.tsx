import type { NextPage } from 'next';
import Head from 'next/head';
import { Currencies } from '@/modules/currencies';
import ScreenWrapper from '@/components/ScreenWrapper';
import ErrorScreen from '@/components/ErrorScreen';
import SimpleGrid from '@/components/SimpleGrid';
import HomeItem from './HomeItem';
import styles from './Home.module.css';

export interface Props {
  currencies?: Currencies;
  hasError?: boolean;
}

export const ERROR_MESSAGE =
  'We have some problems showing the currencies. Please, come back in a few minutes.';

const Home: NextPage<Props> = ({ currencies = [], hasError = false }) => (
  <>
    <Head>
      <title>List of currencies</title>
    </Head>
    {hasError ? (
      <ErrorScreen>{ERROR_MESSAGE}</ErrorScreen>
    ) : (
      <ScreenWrapper>
        <h1 className={styles.title}>List of currencies</h1>
        <SimpleGrid>
          {currencies.map(({ key, name }) => (
            <HomeItem key={key} code={key} name={name} />
          ))}
        </SimpleGrid>
      </ScreenWrapper>
    )}
  </>
);

export default Home;
