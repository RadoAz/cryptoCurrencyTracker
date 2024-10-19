import React, {FC} from 'react';
import {Pressable, ViewStyle} from 'react-native';
import FavoriteIcon from '../../assets/icons/favoriteIcon.svg';
import NotFavoriteIcon from '../../assets/icons/favoriteNegativeIcon.svg';
import styles from './FavoriteButton.styles';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  customStyles: ViewStyle;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({
  isFavorite,
  onPress,
  customStyles,
}) => {
  return (
    <Pressable
      style={[styles.container, customStyles]}
      onPress={onPress}
      testID="favorite-button">
      {isFavorite ? (
        <FavoriteIcon width="25" height="25" testID="favorite-icon" />
      ) : (
        <NotFavoriteIcon width="25" height="25" testID="not-favorite-icon" />
      )}
    </Pressable>
  );
};

export default FavoriteButton;
