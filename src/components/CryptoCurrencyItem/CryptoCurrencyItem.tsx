import React, {useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Crypto} from '../../types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {toggleFavorite} from '../../store/favorites/favoritesSlice';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import styles from './CryptoCurrencyItem.styles';

type CryptoCurrencyItemProps = {
  crypto: Crypto;
  onPress?: () => void;
};

const CryptoCurrencyItem: React.FC<CryptoCurrencyItemProps> = ({
  crypto,
  onPress,
}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const handleToggleFavorite = (cryptoCur: Crypto) => {
    dispatch(toggleFavorite({id: cryptoCur.id, name: cryptoCur.name}));
  };

  const getStyleByPriceChange = () => {
    if (!crypto?.price_change_percentage_24h) {
      return;
    }

    if (crypto?.price_change_percentage_24h > 0) {
      return styles.positive;
    } else {
      return styles.negative;
    }
  };
  const isFavorite = useMemo(() => {
    return favorites.some(fav => fav.id === crypto.id);
  }, [crypto, favorites]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      testID="CryptoItemTouchable">
      <FavoriteButton
        isFavorite={isFavorite}
        onPress={() => handleToggleFavorite(crypto)}
        customStyles={styles.favoriteBtn}
      />
      <View>
        <Text style={styles.title}>
          {`${crypto.name} (${crypto.symbol.toUpperCase()})`}
        </Text>
        <Text style={styles.fieldValue} />
      </View>
      <View style={styles.field}>
        <Text style={styles.fieldTitle}>Price:</Text>
        <Text style={styles.fieldValue}>${crypto.current_price}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.fieldTitle}>Market Cap Rank:</Text>
        <Text style={styles.fieldValue}>{crypto.market_cap_rank}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.fieldTitle}>24-hour Change:</Text>
        <Text style={[styles.fieldValue, getStyleByPriceChange()]}>
          {crypto.price_change_percentage_24h}%{' '}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CryptoCurrencyItem;
