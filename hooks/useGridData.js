import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useGridData(layoutId) {
  const { data, error, isLoading } = useSWR(
    `/api/griddata?layout_id=${layoutId}`,
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: false,
    }
  );

  return {
    data,
    isLoading,
    isError: error,
  };
}