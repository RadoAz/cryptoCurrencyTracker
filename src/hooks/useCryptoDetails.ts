import {useQuery} from '@tanstack/react-query';
import {fetchDetails} from '../api';
import {CryptoDetails} from '../types';

const useCryptoDetails = (id: string) => {
  return useQuery<CryptoDetails>({
    queryKey: ['cryptoDetails', id],
    queryFn: () => fetchDetails(id),
  });
};

export default useCryptoDetails;
