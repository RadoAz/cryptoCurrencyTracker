import React from 'react';
import {render, screen} from '@testing-library/react-native';
import PricesList from '../../../components/PricesList/PricesList';

describe('PricesList', () => {
  it('renders the FlatList with the correct number of items', () => {
    const mockData = [
      {currency: 'usd', value: 2643.35},
      {currency: 'eth', value: 1500.5},
      {currency: 'btc', value: 50000},
    ];

    render(<PricesList data={mockData} />);

    expect(screen.getByText('USD')).toBeTruthy();
    expect(screen.getByText('ETH')).toBeTruthy();
    expect(screen.getByText('BTC')).toBeTruthy();

    expect(screen.getByText('2643.35')).toBeTruthy();
    expect(screen.getByText('1500.5')).toBeTruthy();
    expect(screen.getByText('50000')).toBeTruthy();
  });

  it('renders an empty list if data is empty', () => {
    render(<PricesList data={[]} />);

    expect(screen.queryByText('USD')).toBeNull();
    expect(screen.queryByText('ETH')).toBeNull();
    expect(screen.queryByText('BTC')).toBeNull();
  });
});
