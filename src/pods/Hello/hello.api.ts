// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import logger from '@/utils/logger';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const data = {
    request: {
      method: req.method,
      url: req.url,
    },
    response: {
      status: res.statusCode,
    },
  };
  logger.info(data, 'Handled response.');
  res.status(200).json({ name: 'John Doe' });
}
