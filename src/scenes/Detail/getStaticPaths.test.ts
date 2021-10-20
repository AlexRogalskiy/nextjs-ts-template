import getStaticPaths from './getStaticPaths';
import { currenciesService } from '@/modules/currencies';
import { NotFoundError } from '@/modules/error';

describe('Detail getStaticPaths', () => {
  test('should return the paths', async () => {
    const result = await getStaticPaths({});
    expect(result).toEqual({
      paths: [
        {
          params: {
            key: 'ada',
          },
        },
        {
          params: {
            key: 'aed',
          },
        },
        {
          params: {
            key: 'afn',
          },
        },
        {
          params: {
            key: 'all',
          },
        },
      ],
      fallback: 'blocking',
    });
  });
  test('should return an error', async () => {
    const listKeysAct = currenciesService.listKeys as unknown as jest.Mock;
    listKeysAct.mockRejectedValue(new NotFoundError('Not found error'));
    const result = await getStaticPaths({});
    expect(result).toEqual({
      paths: [],
      fallback: 'blocking',
    });
  });
});
