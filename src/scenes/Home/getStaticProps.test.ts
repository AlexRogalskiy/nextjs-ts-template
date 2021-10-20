import getStaticProps, { REVALIDATE } from './getStaticProps';
import { currenciesService } from '@/modules/currencies';
import { InternalError } from '@/modules/error';

describe('Home getStaticProps', () => {
  test('should return the currencies', async () => {
    const result = await getStaticProps({});
    expect(result).toEqual({
      props: {
        currencies: [
          {
            key: 'ada',
            name: 'Cardano',
          },
          {
            key: 'aed',
            name: 'United Arab Emirates Dirham',
          },
          {
            key: 'afn',
            name: 'Afghan afghani',
          },
          {
            key: 'all',
            name: 'Albanian lek',
          },
        ],
      },
      revalidate: REVALIDATE.ok,
    });
  });
  test('should return an error', async () => {
    const listActn = currenciesService.list as unknown as jest.Mock;
    listActn.mockImplementationOnce(() => {
      throw new InternalError('Could not read fallback currencies');
    });
    const result = await getStaticProps({});
    expect(result).toEqual({
      props: {
        hasError: true,
      },
      revalidate: REVALIDATE.error,
    });
    jest.clearAllMocks();
  });
});
