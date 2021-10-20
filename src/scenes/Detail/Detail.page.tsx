import { FC } from 'react';
import type { NextPage } from 'next';
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
import HistoryTable from './HistoryTable';
import getReversedConversion from './getReversedConversion';
import useFetchConversionsHistory from './useFetchConversionsHistory';

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
  const bgColor = colorHashers.bg.hex(currency.key);
  const decorationColor = colorHashers.decoration.hex(currency.key);
  const titleColor = colorHashers.text.hex(currency.key);
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
            <NextLink href="/" passHref>
              <Link fontSize="sm" colorScheme="purple">
                &lt; List of currencies
              </Link>
            </NextLink>
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
            <Button
              isLoading={isLoading}
              size="sm"
              colorScheme={data ? 'red' : 'purple'}
              onClick={data ? reset : doFetch}
            >
              {data ? 'Close' : 'Check history'}
            </Button>
          </Flex>
        </Box>
        {data ? (
          <HistoryTable data={data} reset={reset} />
        ) : (
          <ItemGrid>
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
