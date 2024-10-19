import React from 'react';
import {render, screen} from '@testing-library/react-native';
import CryptoPriceChart from '../CryptoPriceChart';
import useCryptoPriceChartData from '../../../hooks/useCryptoPriceChartData';
import {Dimensions} from 'react-native';

jest.mock('../../../hooks/useCryptoPriceChartData');
const mockUseCryptoPriceChartData = useCryptoPriceChartData as jest.Mock;

jest.mock('react-native-chart-kit', () => {
  const {View, Text} = require('react-native');
  return {
    LineChart: ({data, width, height}: any) => (
      <View testID="line-chart" width={width} height={height}>
        {data.labels.map((label: string) => (
          <Text key={label}>{label}</Text>
        ))}
      </View>
    ),
  };
});

const mockData = [
  {date: '2023-01-01', price: 30000},
  {date: '2023-01-02', price: 32000},
  {date: '2023-01-03', price: 31000},
];

describe('CryptoPriceChart', () => {
  it('renders loading state correctly', () => {
    mockUseCryptoPriceChartData.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<CryptoPriceChart coinId="bitcoin" currency="usd" />);

    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('renders error state correctly', () => {
    mockUseCryptoPriceChartData.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<CryptoPriceChart coinId="bitcoin" currency="usd" />);

    expect(screen.getByText('Error loading data')).toBeTruthy();
  });

  it('renders chart correctly when data is available', () => {
    mockUseCryptoPriceChartData.mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<CryptoPriceChart coinId="bitcoin" currency="usd" />);

    // Check if chart is rendered by verifying one of the labels is present
    expect(screen.getByText('2023-01-01')).toBeTruthy();
  });

  it('calculates container width correctly based on window dimensions', () => {
    const windowWidth = Dimensions.get('window').width - 72;
    mockUseCryptoPriceChartData.mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<CryptoPriceChart coinId="bitcoin" currency="usd" />);

    expect(screen.getByTestId('line-chart')).toHaveProp('width', windowWidth);
  });
});
