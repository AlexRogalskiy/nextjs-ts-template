import getStaticProps, { REVALIDATE } from './getStaticProps';
import { currenciesService } from '@/modules/currencies';
import { NotFoundError } from '@/modules/error';
import * as timeModule from '@/modules/time';

jest.mock('@/modules/time', () => ({
  getCurrentDateTime: jest.fn(() => '14/10/2021 23:23:21'),
}));

const context = { params: { key: 'ada' } };

describe('Detail getStaticProps', () => {
  test('should return the currencies', async () => {
    const result = await getStaticProps(context);
    expect(result).toEqual({
      props: {
        currency: {
          key: 'ada',
          name: 'Cardano',
          date: '2021-10-20',
          conversions: {
            ada: 0.551182,
            aed: 4.273469,
            afn: 104.300801,
            all: 121.635752,
          },
        },
        lastCheckedAt: '14/10/2021 23:23:21',
      },
      revalidate: REVALIDATE.ok,
    });
  });
  test('should return an error', async () => {
    const getDetailAct = currenciesService.getDetail as unknown as jest.Mock;
    getDetailAct.mockRejectedValue(new NotFoundError('Not found error'));
    const result = await getStaticProps(context);
    expect(result).toEqual({
      props: {
        hasError: true,
      },
      revalidate: REVALIDATE.error,
    });
    jest.clearAllMocks();
  });
});
