import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import FavoriteButton from '../../../components/FavoriteButton/FavoriteButton';

jest.mock('../../../assets/icons/favoriteIcon.svg', () => 'FavoriteIcon');
jest.mock(
  '../../../assets/icons/favoriteNegativeIcon.svg',
  () => 'NotFavoriteIcon',
);

describe('FavoriteButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders FavoriteIcon when isFavorite is true', () => {
    render(
      <FavoriteButton
        isFavorite={true}
        onPress={mockOnPress}
        customStyles={{}}
      />,
    );

    expect(screen.getByTestId('favorite-icon')).toBeTruthy();
  });

  it('renders NotFavoriteIcon when isFavorite is false', () => {
    render(
      <FavoriteButton
        isFavorite={false}
        onPress={mockOnPress}
        customStyles={{}}
      />,
    );

    expect(screen.getByTestId('not-favorite-icon')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    render(
      <FavoriteButton
        isFavorite={true}
        onPress={mockOnPress}
        customStyles={{}}
      />,
    );

    const button = screen.getByTestId('favorite-button');
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalled();
  });

  it('applies custom styles', () => {
    const customStyles = {backgroundColor: 'red'};

    render(
      <FavoriteButton
        isFavorite={true}
        onPress={mockOnPress}
        customStyles={customStyles}
      />,
    );

    const button = screen.getByTestId('favorite-button');

    expect(button.props.style).toContainEqual(customStyles);
  });
});
