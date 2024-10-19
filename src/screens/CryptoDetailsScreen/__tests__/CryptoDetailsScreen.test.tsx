import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react-native';
import CryptoDetailsScreen from '../CryptoDetailsScreen';
import useMarketData from '../../../hooks/useMarketData';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/navigationTypes';
jest.mock('../../../hooks/useMarketData', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../components/CurrencyDropdown/CurrencyDropdown', () => {
  return jest.fn().mockImplementation(({data, onSelect}) => {
    const {View, Text, TouchableOpacity} = require('react-native');
    return (
      <View testID="currency-dropdown">
        {data.map((item: any) => (
          <TouchableOpacity
            key={item.currency}
            onPress={() => onSelect(item.currency)}
            testID={`currency-option-${item.currency}`}>
            <Text>{item.currency}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  });
});

jest.mock('../../../components/DetailsBlock/DetailsBlock', () => {
  return jest.fn().mockImplementation(({title, children}) => {
    const {View, Text} = require('react-native');
    return (
      <View testID={`details-block-${title.replace(/\s+/g, '_')}`}>
        <Text>{title}</Text>
        {children}
      </View>
    );
  });
});

jest.mock('../../../components/CryptoPriceChart/CryptoPriceChart', () => {
  return jest.fn().mockImplementation(({coinId, currency}) => {
    const {View, Text} = require('react-native');
    return (
      <View testID="crypto-price-chart">
        <Text>{`Mocked Chart for ${coinId} in ${currency}`}</Text>
      </View>
    );
  });
});

describe('CryptoDetailsScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  } as unknown as NativeStackNavigationProp<RootStackParamList, 'Details'>;
  const mockRoute = {
    params: {id: 'bitcoin'},
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useMarketData as jest.Mock).mockReturnValue({
      details: null,
      error: null,
      isLoading: true,
      pricesArray: [],
      price: null,
      tradingVolume: null,
      ATH: null,
      ATL: null,
    });

    render(
      <CryptoDetailsScreen navigation={mockNavigation} route={mockRoute} />,
    );

    expect(screen.getByText('Loading')).toBeTruthy();
  });

  it('renders error state', () => {
    const mockError = new Error('Network error');

    (useMarketData as jest.Mock).mockReturnValue({
      details: null,
      error: mockError,
      isLoading: false,
      pricesArray: [],
      price: null,
      tradingVolume: null,
      ATH: null,
      ATL: null,
    });

    render(
      <CryptoDetailsScreen navigation={mockNavigation} route={mockRoute} />,
    );

    expect(screen.getByText(/Network error/i)).toBeTruthy();
  });

  it('renders data correctly', () => {
    const mockDetails = {
      id: 'bitcoin',
      name: 'Bitcoin',
      market_cap_rank: 1,
      market_data: {
        circulating_supply: 18000000,
        total_supply: 21000000,
      },
    };

    const mockPricesArray = [
      {currency: 'usd', value: 50000},
      {currency: 'eur', value: 42000},
    ];

    (useMarketData as jest.Mock).mockReturnValue({
      details: mockDetails,
      error: null,
      isLoading: false,
      pricesArray: mockPricesArray,
      price: 50000,
      tradingVolume: 1000000,
      ATH: 60000,
      ATL: 3000,
    });

    render(
      <CryptoDetailsScreen navigation={mockNavigation} route={mockRoute} />,
    );

    expect(screen.getByText('Bitcoin')).toBeTruthy();

    expect(screen.getByTestId('currency-dropdown')).toBeTruthy();

    expect(screen.getByTestId('details-block-Current_Price')).toBeTruthy();
    expect(screen.getByText('50000 USD')).toBeTruthy();

    expect(screen.getByTestId('details-block-Market_cap')).toBeTruthy();
    expect(screen.getByText('1')).toBeTruthy();

    expect(
      screen.getByTestId('details-block-24-hour_trading_volume'),
    ).toBeTruthy();
    expect(screen.getByText('1000000 USD')).toBeTruthy();

    expect(screen.getByTestId('details-block-Circulating_supply')).toBeTruthy();
    expect(screen.getByText('18000000')).toBeTruthy();

    expect(screen.getByTestId('details-block-Total_supply')).toBeTruthy();
    expect(screen.getByText('21000000')).toBeTruthy();

    expect(
      screen.getByTestId('details-block-All-time_high_price'),
    ).toBeTruthy();
    expect(screen.getByText('60000 USD')).toBeTruthy();

    expect(screen.getByTestId('details-block-All-time_low_price')).toBeTruthy();
    expect(screen.getByText('3000 USD')).toBeTruthy();

    expect(screen.getByTestId('crypto-price-chart')).toBeTruthy();
    expect(screen.getByText('Mocked Chart for bitcoin in usd')).toBeTruthy();
  });

  it('allows changing the selected currency', async () => {
    const mockDetails = {
      id: 'bitcoin',
      name: 'Bitcoin',
      market_cap_rank: 1,
      market_data: {
        circulating_supply: 18000000,
        total_supply: 21000000,
      },
    };

    const mockPricesArray = [
      {currency: 'usd', value: 50000},
      {currency: 'eur', value: 42000},
    ];

    const dataByCurrency = {
      usd: {
        price: 50000,
        tradingVolume: 1000000,
        ATH: 60000,
        ATL: 3000,
      },
      eur: {
        price: 42000,
        tradingVolume: 800000,
        ATH: 50000,
        ATL: 2500,
      },
    };

    const useMarketDataMock = jest.fn((id: string, currency: string) => {
      return {
        details: mockDetails,
        error: null,
        isLoading: false,
        pricesArray: mockPricesArray,
        price: dataByCurrency[currency].price,
        tradingVolume: dataByCurrency[currency].tradingVolume,
        ATH: dataByCurrency[currency].ATH,
        ATL: dataByCurrency[currency].ATL,
      };
    });

    (useMarketData as jest.Mock).mockImplementation(useMarketDataMock);

    render(
      <CryptoDetailsScreen navigation={mockNavigation} route={mockRoute} />,
    );

    expect(screen.getByText('50000 USD')).toBeTruthy();

    const eurOption = screen.getByTestId('currency-option-eur');
    fireEvent.press(eurOption);

    await waitFor(() => {
      expect(screen.getByText('42000 EUR')).toBeTruthy();
    });
  });
});
