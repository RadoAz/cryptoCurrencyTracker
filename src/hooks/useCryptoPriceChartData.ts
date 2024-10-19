import {useQuery} from '@tanstack/react-query';
import {fetchCryptoPriceChartData} from '../api';
import {ChartData} from '../types';

const useCryptoPriceChartData = (coinId: string, currency: string) => {
  return useQuery<ChartData[]>({
    queryKey: ['cryptoPriceData', coinId, currency],
    queryFn: () => fetchCryptoPriceChartData(coinId, currency),
  });
};

export default useCryptoPriceChartData;
