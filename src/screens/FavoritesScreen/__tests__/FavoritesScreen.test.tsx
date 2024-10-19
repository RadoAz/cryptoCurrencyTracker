import React from 'react';
import {render, screen} from '@testing-library/react-native';
import FavoritesScreen from '../FavoritesScreen';
import configureMockStore, {MockStoreEnhanced} from 'redux-mock-store';
import {Provider} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../../store/store';
import {Crypto} from '../../../types';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../../components/FavoritesList/FavoritesList', () => {
  return jest.fn().mockImplementation(({favorites}) => {
    const {View, Text} = require('react-native');
    return (
      <View testID="favorites-list">
        {favorites.map((fav: Crypto) => (
          <Text key={fav.id}>{fav.name}</Text>
        ))}
      </View>
    );
  });
});

describe('FavoritesScreen', () => {
  let store: MockStoreEnhanced<RootState>;
  const mockStore = configureMockStore<RootState>([]);

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({
      favorites: {
        favorites: [],
      },
    });
  });

  it('renders correctly with favorites from the store', () => {
    const mockFavorites: Crypto[] = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'btc',
        current_price: 50000,
        market_cap_rank: 1,
        price_change_percentage_24h: 5.0,
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'eth',
        current_price: 4000,
        market_cap_rank: 2,
        price_change_percentage_24h: 3.0,
      },
    ];

    store = mockStore({
      favorites: {
        favorites: mockFavorites,
      },
    });

    const mockSetOptions = jest.fn();

    (useNavigation as jest.Mock).mockReturnValue({
      setOptions: mockSetOptions,
    });

    render(
      <Provider store={store}>
        <FavoritesScreen />
      </Provider>,
    );

    expect(screen.getByTestId('favorites-list')).toBeTruthy();
    expect(screen.getByText('Bitcoin')).toBeTruthy();
    expect(screen.getByText('Ethereum')).toBeTruthy();

    expect(mockSetOptions).toHaveBeenCalledWith({
      headerShown: true,
      title: 'Favorite Cryptocurrencies',
    });
  });

  it('renders correctly when there are no favorites', () => {
    store = mockStore({
      favorites: {
        favorites: [],
      },
    });

    const mockSetOptions = jest.fn();

    (useNavigation as jest.Mock).mockReturnValue({
      setOptions: mockSetOptions,
    });

    render(
      <Provider store={store}>
        <FavoritesScreen />
      </Provider>,
    );

    expect(screen.getByTestId('favorites-list')).toBeTruthy();
    expect(screen.queryByText('Bitcoin')).toBeNull();

    expect(mockSetOptions).toHaveBeenCalledWith({
      headerShown: true,
      title: 'Favorite Cryptocurrencies',
    });
  });

  it('sets navigation options in useLayoutEffect', () => {
    store = mockStore({
      favorites: {
        favorites: [],
      },
    });

    const mockSetOptions = jest.fn();

    (useNavigation as jest.Mock).mockReturnValue({
      setOptions: mockSetOptions,
    });

    render(
      <Provider store={store}>
        <FavoritesScreen />
      </Provider>,
    );

    expect(mockSetOptions).toHaveBeenCalledWith({
      headerShown: true,
      title: 'Favorite Cryptocurrencies',
    });
  });
});
