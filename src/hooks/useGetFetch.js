import useSWR from 'swr';

export default function useGetFetch(url, options = {}) {
  const { isLoading, error, data } = useSWR(url, options.fetcher || null, {
    reOnFocus: false,
    ...options,
  });

  return {
    apiData: data,
    isLoading: !error && !data,
    serverError: error,
  };
}
