import { GetStaticPaths } from 'next';
import { currenciesService } from '@/modules/currencies';
import logger from '@/modules/logger';

const buildParams = (currencyKey: string) => ({
  params: { key: currencyKey },
});

const getStaticPaths: GetStaticPaths = async () => {
  try {
    const currenciesKeys = await currenciesService.listKeys();
    return {
      paths: currenciesKeys.map(buildParams),
      fallback: 'blocking',
    };
  } catch (e) {
    logger.fatal(e, 'Error rendering static props for currencies');
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export default getStaticPaths;
