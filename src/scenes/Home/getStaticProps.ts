import { GetStaticProps } from 'next';
import { currenciesService } from '@/modules/currencies';
import logger from '@/modules/logger';
import { Props } from './Home.page';

export const REVALIDATE = {
  ok: 24 * 60 * 60,
  error: 5 * 60,
};

const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const currencies = await currenciesService.list();
    return {
      props: {
        currencies,
      },
      revalidate: REVALIDATE.ok,
    };
  } catch (e) {
    logger.fatal(e, 'Error rendering static props for currencies');
    return {
      props: {
        hasError: true,
      },
      revalidate: REVALIDATE.error,
    };
  }
};

export default getStaticProps;
