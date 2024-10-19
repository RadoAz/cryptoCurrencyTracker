import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureMockStore, {MockStoreEnhanced} from 'redux-mock-store';
import CryptoCurrencyItem from '../CryptoCurrencyItem';
import {RootState} from '../../../store/store';
import {toggleFavorite} from '../../../store/favorites/favoritesSlice';
import {Crypto} from '../../../types';

interface RootStateType {
  favorites: {
    favorites: {id: string; name: string}[];
  };
}

const mockStore = configureMockStore<RootState>([]);

jest.mock('../../FavoriteButton/FavoriteButton', () => (props: any) => {
  const {TouchableOpacity, Text} = require('react-native');
  return (
    <TouchableOpacity
      onPress={props.onPress}
      testID="FavoriteButton"
      accessibilityRole="button">
      <Text>{props.isFavorite ? 'Unfavorite' : 'Favorite'}</Text>
    </TouchableOpacity>
  );
});

describe('CryptoCurrencyItem Component', () => {
  let store: MockStoreEnhanced<RootStateType, {}>;

  const mockCrypto: Crypto = {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    current_price: 50000,
    market_cap_rank: 1,
    price_change_percentage_24h: 5.0,
  };

  beforeEach(() => {
    store = mockStore({
      favorites: {
        favorites: [],
      },
    });
    store.dispatch = jest.fn();
  });

  const renderComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <CryptoCurrencyItem crypto={mockCrypto} {...props} />
      </Provider>,
    );
  };

  it('renders correctly with given crypto data', () => {
    renderComponent();

    expect(screen.getByText('Bitcoin (BTC)')).toBeTruthy();
    expect(screen.getByText('Price:')).toBeTruthy();
    expect(screen.getByText('$50000')).toBeTruthy();
    expect(screen.getByText('Market Cap Rank:')).toBeTruthy();
    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByText('24-hour Change:')).toBeTruthy();
    expect(screen.getByText('5%')).toBeTruthy();
  });

  it('dispatches toggleFavorite action when FavoriteButton is pressed', () => {
    renderComponent();
    const favoriteButton = screen.getByTestId('FavoriteButton');

    fireEvent.press(favoriteButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      toggleFavorite({id: 'bitcoin', name: 'Bitcoin'}),
    );
  });

  it('calls onPress when TouchableOpacity is pressed', () => {
    const mockOnPress = jest.fn();
    renderComponent({onPress: mockOnPress});

    const touchableOpacity = screen.getByTestId('CryptoItemTouchable');

    fireEvent.press(touchableOpacity);

    expect(mockOnPress).toHaveBeenCalled();
  });

  it('applies positive style when price change is positive', () => {
    renderComponent();
    const priceChangeText = screen.getByText('5%');

    expect(priceChangeText.props.style).toContainEqual({color: 'green'});
  });

  it('applies negative style when price change is negative', () => {
    const negativeCrypto = {
      ...mockCrypto,
      price_change_percentage_24h: -2.5,
    };
    render(
      <Provider store={store}>
        <CryptoCurrencyItem crypto={negativeCrypto} />
      </Provider>,
    );
    const priceChangeText = screen.getByText('-2.5%');

    expect(priceChangeText.props.style).toContainEqual({color: 'red'});
  });
});
