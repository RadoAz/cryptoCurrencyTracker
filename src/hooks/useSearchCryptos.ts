import {useQuery} from '@tanstack/react-query';
import {fetchSearchResults} from '../api';
import {Crypto} from '../types';

const useSearchCryptos = (query: string) => {
  return useQuery<Crypto[]>({
    queryKey: ['searchCryptos', query],
    queryFn: () => fetchSearchResults(query),
    enabled: !!query,
  });
};

export default useSearchCryptos;
