import {useState, useEffect} from 'react';
import useCryptos from './useCryptos';
import {debounce} from '../utils';
import useSearchCryptos from './useSearchCryptos';

export const useDashboardData = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');

  useEffect(() => {
    const handler = debounce((query: string) => setDebouncedQuery(query), 1000);
    handler(searchQuery);
  }, [searchQuery]);

  const {
    data: searchData,
    refetch: searchRefetch,
    isFetching: isFetchingSearch,
  } = useSearchCryptos(debouncedQuery);

  const {
    data,
    error,
    isLoading: isFetchingCryptos,
    fetchNextPage,
    hasNextPage,
    refetch: cryptosRefetch,
  } = useCryptos();

  useEffect(() => {
    if (debouncedQuery) {
      searchRefetch();
    } else {
      cryptosRefetch();
    }
  }, [debouncedQuery, searchRefetch, cryptosRefetch]);

  const cryptos = debouncedQuery ? searchData || [] : data?.pages.flat() || [];

  const isLoading = isFetchingCryptos || isFetchingSearch;

  return {
    searchQuery,
    setSearchQuery,
    cryptos,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    refetch: debouncedQuery ? searchRefetch : cryptosRefetch,
  };
};
