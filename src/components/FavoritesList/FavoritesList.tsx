import React from 'react';
import {FlatList} from 'react-native';
import FavoriteItem from '../FavoriteItem/FavoriteItem';

interface Favorite {
  id: string;
  name: string;
}

interface FavoritesListProps {
  favorites: Favorite[];
}

const FavoritesList: React.FC<FavoritesListProps> = ({favorites}) => {
  const renderItem = ({item}: {item: Favorite}) => (
    <FavoriteItem favorite={item} />
  );

  return (
    <FlatList
      data={favorites}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${index}-${item.id}`}
    />
  );
};

export default FavoritesList;
