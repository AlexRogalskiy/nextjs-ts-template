import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { currenciesService } from '@/modules/currencies';
import logger from '@/modules/logger';
import { getCurrentDateTime } from '@/utils/time';
import { Props } from './Detail.page';

export const REVALIDATE = {
  ok: 0.5 * 60 * 60,
  error: 5 * 60,
};

interface Params extends ParsedUrlQuery {
  key: string;
}

const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const { key } = context.params as Params;
  try {
    const currency = await currenciesService.getDetail(key);
    return {
      props: {
        currency,
        lastCheckedAt: getCurrentDateTime(),
      },
      revalidate: REVALIDATE.ok,
    };
  } catch (e) {
    logger.fatal(e, `Error rendering static props for currency: ${key}`);
    return {
      props: {
        hasError: true,
      },
      revalidate: REVALIDATE.error,
    };
  }
};

export default getStaticProps;
