import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchCryptos} from '../api';

const useCryptos = () => {
  return useInfiniteQuery({
    queryKey: ['cryptos'],
    queryFn: ({pageParam}) => fetchCryptos(pageParam),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.length === 10 ? lastPage.length + 1 : undefined;
    },
  });
};

export default useCryptos;
