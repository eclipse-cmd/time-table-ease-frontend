'use client';
import { _BASE_API_URL } from '@/constants';
import { useEffect, useState } from 'react';
import { getLocalStorage } from '../utils';

interface UseFetchResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  reValidate: () => void;
}

export function useFetch<T>(resource: string, method = 'GET'): UseFetchResult<T> {
  const [data, setData] = useState<T | null | any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [revalidate, setRevalidate] = useState(false);

  const apiVersion = process.env.NEXT_PUBLIC_BASE_API_VERSION ?? '';
  const url = `${_BASE_API_URL}${apiVersion}/${resource}`;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const response = await fetch(url, {
          method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getLocalStorage()}`,
          },
        });

        if (!response.ok) {
          const error = new Error('Network response was not ok');
          setError(error as Error);
        } else {
          const json = await response.json();

          if (!json) {
            const error = new Error('Response could not be parsed');
            setError(error);
          } else {
            if (json.success) {
              setData(json.data);
            } else {
              const error = new Error('Response not successful');
              setError(error);
            }
          }
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [method, url, revalidate]);

  return { data, error, isLoading: loading, reValidate: () => setRevalidate((r) => !r) };
}
