import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { Currencies } from '@/modules/currencies';
import ScreenWrapper from '@/components/ScreenWrapper';
import ErrorScreen from '@/components/ErrorScreen';
import ItemGrid from '@/components/ItemGrid';
import ItemCard from '@/components/ItemCard';

export interface Props {
  currencies?: Currencies;
  hasError?: boolean;
}

export const ERROR_MESSAGE =
  'We have some problems showing the currencies. Please, come back in a few minutes.';

const Home: NextPage<Props> = ({ currencies = [], hasError = false }) => (
  <>
    <Head>
      <title>🤑 List of currencies</title>
    </Head>
    {hasError ? (
      <ErrorScreen>{ERROR_MESSAGE}</ErrorScreen>
    ) : (
      <ScreenWrapper>
        <Box as="header" textAlign="center" marginBottom={6}>
          <Heading as="h1" color="gray.600">
            🤑 List of currencies
          </Heading>
        </Box>
        <ItemGrid>
          {currencies.map(({ key, name }) => (
            <ItemCard key={key} title={key} href={`/detail/${key}`}>
              <Text fontSize="sm" color="gray.500">
                {name}
              </Text>
            </ItemCard>
          ))}
        </ItemGrid>
      </ScreenWrapper>
    )}
  </>
);

export default Home;
