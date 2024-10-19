import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import CryptoCurrenciesList from '../CryptoCurrenciesList';
import {Crypto} from '../../../types';

jest.mock('../../CryptoCurrencyItem/CryptoCurrencyItem', () => {
  return jest.fn().mockImplementation(({crypto, onPress}) => {
    const {TouchableOpacity, Text} = require('react-native');
    return (
      <TouchableOpacity
        onPress={onPress}
        testID={`crypto-item-${crypto.id}`}
        accessibilityRole="button">
        <Text>{crypto.name}</Text>
      </TouchableOpacity>
    );
  });
});

describe('CryptoCurrenciesList Component', () => {
  const mockCryptos: Crypto[] = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      current_price: 50000,
      market_cap_rank: 1,
      price_change_percentage_24h: 5.0,
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      current_price: 4000,
      market_cap_rank: 2,
      price_change_percentage_24h: 3.5,
    },
  ];

  it('renders a list of cryptocurrencies', () => {
    render(<CryptoCurrenciesList cryptos={mockCryptos} />);

    expect(screen.getByText('Bitcoin')).toBeTruthy();
    expect(screen.getByText('Ethereum')).toBeTruthy();
  });

  it('calls onItemPress when a crypto item is pressed', () => {
    const mockOnItemPress = jest.fn();
    render(
      <CryptoCurrenciesList
        cryptos={mockCryptos}
        onItemPress={mockOnItemPress}
      />,
    );

    const bitcoinItem = screen.getByTestId('crypto-item-bitcoin');
    fireEvent.press(bitcoinItem);

    expect(mockOnItemPress).toHaveBeenCalledWith('bitcoin');
  });

  it('calls onEndReached when the end of the list is reached', () => {
    const mockOnEndReached = jest.fn();
    render(
      <CryptoCurrenciesList
        cryptos={mockCryptos}
        onEndReached={mockOnEndReached}
      />,
    );

    fireEvent.scroll(screen.getByTestId('crypto-currencies-list'), {
      nativeEvent: {
        contentOffset: {y: 1000},
        contentSize: {height: 1000},
        layoutMeasurement: {height: 500},
      },
    });

    expect(mockOnEndReached).toHaveBeenCalled();
  });

  it('calls onRefresh when the list is pulled down to refresh', async () => {
    const mockOnRefresh = jest.fn().mockResolvedValue(null);
    render(
      <CryptoCurrenciesList cryptos={mockCryptos} onRefresh={mockOnRefresh} />,
    );

    fireEvent(screen.getByTestId('crypto-currencies-list'), 'refresh');

    await waitFor(() => expect(mockOnRefresh).toHaveBeenCalled());
  });
});
