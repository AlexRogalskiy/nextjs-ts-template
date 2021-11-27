import { FC } from 'react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { CurrencyDetail } from '@/modules/currencies';
import colorHashers from '@/modules/colorHashers';
import ScreenWrapper from '@/components/ScreenWrapper';
import ErrorScreen from '@/components/ErrorScreen';
import ItemGrid from '@/components/ItemGrid';
import ItemCard from '@/components/ItemCard';
import ConversionLine from '@/components/ConversionLine';
import getReversedConversion from './getReversedConversion';
import useFetchConversionsHistory from './useFetchConversionsHistory';
const HistoryTable = dynamic(() => import('./HistoryTable'));

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
  const bgColor = colorHashers.bg(currency.key);
  const decorationColor = colorHashers.decoration(currency.key);
  const titleColor = colorHashers.text(currency.key);
  const { isLoading, data, reset, doFetch } = useFetchConversionsHistory(
    currency.key,
    currency.date,
  );
  return (
    <>
      <Head>
        <title>
          {currency.name}: {currency.key}
        </title>
      </Head>
      <ScreenWrapper bgColor={bgColor}>
        <Box as="header" marginBottom={5}>
          <Flex justifyContent="space-between" alignItems="center">
            <Box flex={1}>
              <NextLink href="/" passHref>
                <Link fontSize="sm" colorScheme="purple">
                  &lt; List of currencies
                </Link>
              </NextLink>
            </Box>
            <Box>
              <Heading as="h1" color={titleColor}>
                {currency.name}{' '}
                <Text as="small" color={decorationColor}>
                  {currency.key}
                </Text>
              </Heading>
              <Text
                as="footer"
                textAlign="center"
                fontSize="xs"
                color="rgba(0,0,0,0.5)"
              >
                Conversions for: {getFormattedDate(currency.date)}
              </Text>
            </Box>
            <Box flex={1} display="flex" justifyContent="flex-end">
              <Button
                isLoading={isLoading}
                size="sm"
                colorScheme={data ? 'red' : 'purple'}
                onClick={data ? reset : doFetch}
              >
                {data ? 'Close' : 'Check history'}
              </Button>
            </Box>
          </Flex>
        </Box>
        {data ? (
          <HistoryTable data={data} reset={reset} />
        ) : (
          <ItemGrid transition="opacity 0.3s" opacity={isLoading ? 0.3 : 1}>
            {Object.keys(currency.conversions).map((key) => (
              <ItemCard
                key={key}
                title={key}
                titleAs="h2"
                href={`/detail/${key}`}
              >
                <ConversionLine
                  fromUnit={currency.key}
                  toUnit={key}
                  value={currency.conversions[key]}
                />
                <ConversionLine
                  fromUnit={key}
                  toUnit={currency.key}
                  value={getReversedConversion(currency.conversions[key])}
                />
              </ItemCard>
            ))}
          </ItemGrid>
        )}
        <Box
          as="footer"
          textAlign="center"
          marginTop="20px"
          color="rgba(0,0,0,0.5)"
        >
          Page built at: {lastCheckedAt}
        </Box>
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
