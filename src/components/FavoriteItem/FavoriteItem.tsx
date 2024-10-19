import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FavoriteIcon from '../../assets/icons/favoriteIcon.svg';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/navigationTypes';
import styles from './FavoriteItem.styles';

interface Favorite {
  id: string;
  name: string;
}

interface FavoriteItemProps {
  favorite: Favorite;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({favorite}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Details', {id: favorite.id})}>
      <View style={styles.itemContainer}>
        <FavoriteIcon width="25" height="25" style={styles.icon} />
        <Text>{favorite.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FavoriteItem;
