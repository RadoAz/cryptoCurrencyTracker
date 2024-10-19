import {useMemo, useCallback} from 'react';
import {preparePricesDropdownData} from '../utils';
import useCryptoDetails from './useCryptoDetails';
import {PriceItem} from '../types';

const useMarketData = (id: string, currency: string) => {
  const {data: details, error, isLoading} = useCryptoDetails(id);

  const getPriceValue = useCallback(
    (arr: PriceItem[]) => {
      if (!arr.length) {
        return;
      }

      const chosenItem = arr.find(
        (item: PriceItem) => item.currency === currency,
      );

      return chosenItem?.value;
    },
    [currency],
  );

  const pricesArray = useMemo(() => {
    if (details?.market_data?.current_price) {
      return preparePricesDropdownData(details?.market_data?.current_price);
    }

    return [];
  }, [details?.market_data?.current_price]);

  const price = useMemo(() => {
    return getPriceValue(pricesArray);
  }, [getPriceValue, pricesArray]);

  const tradingVolume = useMemo(() => {
    if (details?.market_data?.total_volume) {
      return getPriceValue(
        preparePricesDropdownData(details?.market_data?.total_volume),
      );
    }
  }, [details?.market_data?.total_volume, getPriceValue]);
  const ATH = useMemo(() => {
    if (details?.market_data?.ath) {
      return getPriceValue(
        preparePricesDropdownData(details?.market_data?.ath),
      );
    }
  }, [details?.market_data?.ath, getPriceValue]);
  const ATL = useMemo(() => {
    if (details?.market_data?.atl) {
      return getPriceValue(
        preparePricesDropdownData(details?.market_data?.atl),
      );
    }
  }, [details?.market_data?.atl, getPriceValue]);

  return {
    details,
    error,
    isLoading,
    pricesArray,
    price,
    tradingVolume,
    ATH,
    ATL,
  };
};

export default useMarketData;
