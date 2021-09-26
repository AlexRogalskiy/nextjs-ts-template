import { GetStaticProps } from 'next';
import { currenciesService } from '@/modules/currencies';
import logger from '@modules/logger';
import { Props } from './Home.component';

const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const currencies = await currenciesService.listCurrencies();
    return {
      props: {
        currencies,
      },
    };
  } catch (e) {
    logger.fatal(e, 'Error rendering static props for currencies');
    return {
      props: {
        currencies: [],
        hasError: true,
      },
    };
  }
};

export default getStaticProps;
