import { useState, useCallback } from 'react';
import httpClient from '@/modules/httpClient';
import { ConversionsHistory } from '@/api/conversionsHistory';

export type { ConversionsHistory };

const useFetchConversionsHistory = (key: string, date: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ConversionsHistory | null>(null);
  const [error, setError] = useState<string | null>(null);

  const doFetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const newData = await httpClient.get<ConversionsHistory>(
        `/api/conversions-history/${key}/${date}`,
      );
      setError(null);
      setData(newData);
    } catch (e: any) {
      setError(e.message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [date, key]);

  const reset = useCallback(() => setData(null), []);

  return {
    isLoading,
    data,
    error,
    doFetch,
    reset,
  };
};

export default useFetchConversionsHistory;
