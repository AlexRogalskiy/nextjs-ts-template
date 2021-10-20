import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import ColorHash from 'color-hash';
import { CurrencyDetail } from '@/modules/currencies';
import ScreenWrapper from '@/components/ScreenWrapper';
import ErrorScreen from '@/components/ErrorScreen';
import SimpleGrid from '@/components/SimpleGrid';
import { Card, CardTitle, CardText } from '@/components/Card';
import styles from './Detail.module.css';
import getReversedConversion from './getReversedConversion';
import { FC } from 'react';

const bgColorHash = new ColorHash({ lightness: 0.95, saturation: 0.15 });
const textColorHash = new ColorHash({ lightness: 0.35, saturation: 0.35 });

export const ERROR_MESSAGE =
  'We have some problems showing the detail. Please, come back in a few minutes.';

const getFormattedDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString();

const DetailError: FC = () => (
  <>
    <Head>
      <title>Error getting currency</title>
    </Head>
    <ErrorScreen>{ERROR_MESSAGE}</ErrorScreen>
  </>
);

export interface ContentProps {
  currency: CurrencyDetail;
  lastCheckedAt: string;
}

const DetailContent: FC<ContentProps> = ({ currency, lastCheckedAt }) => {
  const bgColor = bgColorHash.hex(currency.key);
  const titleColor = textColorHash.hex(currency.key);
  return (
    <>
      <Head>
        <title>
          {currency.name}: {currency.key}
        </title>
      </Head>
      <ScreenWrapper bg={bgColor}>
        <header className={styles.header}>
          <Link href="/">
            <a className={styles.back}>&lt; List of currencies</a>
          </Link>
          <hgroup className={styles.titleWrapper}>
            <h1
              className={styles.title}
              style={{
                color: titleColor,
              }}
            >
              {currency.name}
            </h1>
            <CardTitle>{currency.key}</CardTitle>
            <small className={styles.titleDetail}>
              at {getFormattedDate(currency.date)}
            </small>
          </hgroup>
        </header>
        <SimpleGrid>
          {Object.keys(currency.conversions).map((key) => (
            <li key={key}>
              <Link href={`/detail/${key}`} passHref>
                <Card>
                  <CardTitle>{key}</CardTitle>
                  <CardText>
                    1 {currency.key} = {currency.conversions[key]} {key}
                  </CardText>
                  <CardText>
                    1 {key} = {getReversedConversion(currency.conversions[key])}{' '}
                    {currency.key}
                  </CardText>
                </Card>
              </Link>
            </li>
          ))}
        </SimpleGrid>
        <footer className={styles.footer}>
          Page built at: {lastCheckedAt}
        </footer>
      </ScreenWrapper>
    </>
  );
};

export interface Props {
  currency?: ContentProps['currency'];
  lastCheckedAt?: ContentProps['lastCheckedAt'];
  hasError?: boolean;
}

const Detail: NextPage<Props> = ({
  currency,
  lastCheckedAt,
  hasError = false,
}) => {
  const isValid = !hasError && currency && lastCheckedAt;
  return isValid ? (
    <DetailContent currency={currency} lastCheckedAt={lastCheckedAt} />
  ) : (
    <DetailError />
  );
};

export default Detail;
