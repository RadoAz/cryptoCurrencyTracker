import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import DashboardScreen from '../DashboardScreen';
import {useDashboardData} from '../../../hooks/useDashboardData';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/navigationTypes';

type ErrorType = {
  error: {
    message: string;
  };
};

type CryptoItemType = {
  item: {
    id: string;
    name: string;
  };
};

jest.mock('../../../hooks/useDashboardData');

jest.mock('../../../components/SearchField/SearchField', () => {
  return jest.fn().mockImplementation(({value, onSearch}) => {
    const {TextInput} = require('react-native');
    return (
      <TextInput testID="search-field" value={value} onChangeText={onSearch} />
    );
  });
});

jest.mock(
  '../../../components/CryptoCurrenciesList/CryptoCurrenciesList',
  () => {
    return jest
      .fn()
      .mockImplementation(({cryptos, onItemPress, onEndReached, onRefresh}) => {
        const {FlatList, Text, TouchableOpacity} = require('react-native');
        return (
          <FlatList
            testID="crypto-currencies-list"
            data={cryptos}
            renderItem={({item}: CryptoItemType) => (
              <TouchableOpacity onPress={() => onItemPress(item.id)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            onEndReached={onEndReached}
            onRefresh={onRefresh}
            refreshing={false}
          />
        );
      });
  },
);

jest.mock('../../../components/LoadingComponent/LoadingComponent', () => {
  return () => {
    const {Text} = require('react-native');
    return <Text testID="loading-component">Loading...</Text>;
  };
});

jest.mock('../../../components/ErrorComponent/ErrorComponent', () => {
  return ({error}: ErrorType) => {
    const {Text} = require('react-native');
    return <Text testID="error-component">{error.message}</Text>;
  };
});

describe('DashboardScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  } as unknown as NativeStackNavigationProp<
    RootStackParamList,
    'DashboardScreen'
  >;

  const mockRoute = {
    key: 'DashboardScreenKey',
    name: 'DashboardScreen',
    params: undefined,
  } as RouteProp<RootStackParamList, 'DashboardScreen'>;

  const mockCryptos = [
    {id: 'bitcoin', name: 'Bitcoin'},
    {id: 'ethereum', name: 'Ethereum'},
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useDashboardData as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: jest.fn(),
      cryptos: [],
      isLoading: true,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      refetch: jest.fn(),
    });

    render(<DashboardScreen navigation={mockNavigation} route={mockRoute} />);

    expect(screen.getByTestId('loading-component')).toBeTruthy();
  });

  it('renders error state', () => {
    const mockError = new Error('Network error');
    (useDashboardData as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: jest.fn(),
      cryptos: [],
      isLoading: false,
      error: mockError,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      refetch: jest.fn(),
    });

    render(<DashboardScreen navigation={mockNavigation} route={mockRoute} />);

    expect(screen.getByTestId('error-component')).toBeTruthy();
    expect(screen.getByText('Network error')).toBeTruthy();
  });

  it('renders cryptos and handles item press', () => {
    const mockSetSearchQuery = jest.fn();
    (useDashboardData as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      cryptos: mockCryptos,
      isLoading: false,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      refetch: jest.fn(),
    });

    render(<DashboardScreen navigation={mockNavigation} route={mockRoute} />);

    expect(screen.queryByTestId('loading-component')).toBeNull();
    expect(screen.queryByTestId('error-component')).toBeNull();

    expect(screen.getByText('Bitcoin')).toBeTruthy();
    expect(screen.getByText('Ethereum')).toBeTruthy();

    const bitcoinItem = screen.getByText('Bitcoin');
    fireEvent.press(bitcoinItem);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Details', {
      id: 'bitcoin',
    });
  });

  it('handles search input', () => {
    const mockSetSearchQuery = jest.fn();
    (useDashboardData as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      cryptos: mockCryptos,
      isLoading: false,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      refetch: jest.fn(),
    });

    render(<DashboardScreen navigation={mockNavigation} route={mockRoute} />);

    const searchField = screen.getByTestId('search-field');
    fireEvent.changeText(searchField, 'bitcoin');

    expect(mockSetSearchQuery).toHaveBeenCalledWith('bitcoin');
  });

  it('fetches next page when end is reached', () => {
    const mockFetchNextPage = jest.fn();
    (useDashboardData as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: jest.fn(),
      cryptos: mockCryptos,
      isLoading: false,
      error: null,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      refetch: jest.fn(),
    });

    render(<DashboardScreen navigation={mockNavigation} route={mockRoute} />);

    const cryptoList = screen.getByTestId('crypto-currencies-list');
    fireEvent(cryptoList, 'onEndReached');

    expect(mockFetchNextPage).toHaveBeenCalled();
  });

  it('does not fetch next page if no more pages', () => {
    const mockFetchNextPage = jest.fn();
    (useDashboardData as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: jest.fn(),
      cryptos: mockCryptos,
      isLoading: false,
      error: null,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      refetch: jest.fn(),
    });

    render(<DashboardScreen navigation={mockNavigation} route={mockRoute} />);

    const cryptoList = screen.getByTestId('crypto-currencies-list');
    fireEvent(cryptoList, 'onEndReached');

    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });

  it('refreshes data on pull to refresh', () => {
    const mockRefetch = jest.fn();
    (useDashboardData as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: jest.fn(),
      cryptos: mockCryptos,
      isLoading: false,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      refetch: mockRefetch,
    });

    render(<DashboardScreen navigation={mockNavigation} route={mockRoute} />);

    const cryptoList = screen.getByTestId('crypto-currencies-list');
    fireEvent(cryptoList, 'refresh');

    expect(mockRefetch).toHaveBeenCalled();
  });
});
