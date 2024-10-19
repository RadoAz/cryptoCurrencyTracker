import React, {useState, useCallback} from 'react';
import {FlatList} from 'react-native';
import {Crypto} from '../../types';
import CryptoCurrencyItem from '../CryptoCurrencyItem/CryptoCurrencyItem';

type CryptoCurrenciesListProps = {
  cryptos: Crypto[] | undefined;
  onItemPress?: (id: string) => void;
  onEndReached?: () => void;
  onRefresh?: () => void;
};

const CryptoCurrenciesList: React.FC<CryptoCurrenciesListProps> = ({
  cryptos,
  onItemPress,
  onEndReached,
  onRefresh,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    if (onRefresh) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
  }, [onRefresh]);

  return (
    <FlatList
      testID="crypto-currencies-list"
      data={cryptos || []}
      onRefresh={handleRefresh}
      refreshing={refreshing}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      keyExtractor={(item, index) => `${index}-${item.id}`}
      renderItem={({item}) => (
        <CryptoCurrencyItem
          crypto={item}
          onPress={onItemPress ? () => onItemPress(item.id) : undefined}
        />
      )}
    />
  );
};

export default CryptoCurrenciesList;
