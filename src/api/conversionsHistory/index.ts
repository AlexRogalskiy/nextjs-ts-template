import type { NextApiRequest, NextApiResponse } from 'next';
import { format, subDays } from 'date-fns';
import { currenciesService } from '@/modules/currencies';

export interface ConversionsHistory {
  dates: ReadonlyArray<string>;
  conversions: ReadonlyArray<{
    key: string;
    values: number[];
  }>;
}

const conversionsHistory = async (
  req: NextApiRequest,
  res: NextApiResponse<{ error: string } | ConversionsHistory>,
) => {
  const currencyKey = req.query.key as string;
  const dateStr = req.query.date as string;

  if (!currencyKey || !dateStr) {
    res.status(400).json({
      error: 'Invalid arguments',
    });
  } else {
    const currentDate = new Date(dateStr);
    const previousDates = [5, 4, 3, 2, 1].map((days) =>
      format(subDays(currentDate, days), 'yyyy-MM-dd'),
    );
    const result = await Promise.all(
      previousDates.map((previousDateStr) =>
        currenciesService.getConversions(currencyKey, previousDateStr),
      ),
    );
    if (!result.length || !result[0] || !result[0].conversions) {
      res.status(404).json({
        error: 'Invalid result',
      });
    }

    const dates = result.map(({ date }) => date);
    const conversions = Object.keys(result[0].conversions).map((key) => ({
      key,
      values: result.map(({ conversions }) => conversions[key] || 0),
    }));

    const response = {
      dates,
      conversions,
    };

    res.status(200).json(response);
  }
};

export default conversionsHistory;
