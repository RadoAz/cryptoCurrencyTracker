import React, {useLayoutEffect, FC} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {useNavigation} from '@react-navigation/native';
import FavoritesList from '../../components/FavoritesList/FavoritesList';
import styles from './FavoritesScreen.styles';

const FavoritesScreen: FC = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FavoritesList favorites={favorites} />
    </View>
  );
};

export default FavoritesScreen;
