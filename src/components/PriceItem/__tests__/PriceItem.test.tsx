import React from 'react';
import {render, screen} from '@testing-library/react-native';
import PriceItem from '../../../components/PriceItem/PriceItem';

describe('PriceItem', () => {
  it('renders the currency and value correctly', () => {
    const mockData = {currency: 'usd', value: 2643.35};

    render(<PriceItem data={mockData} />);

    expect(screen.getByText('USD')).toBeTruthy();

    expect(screen.getByText('2643.35')).toBeTruthy();
  });

  it('renders the currency in uppercase', () => {
    const mockData = {currency: 'eth', value: 1500.5};

    render(<PriceItem data={mockData} />);

    expect(screen.getByText('ETH')).toBeTruthy();
  });

  it('renders the value correctly when it is an integer', () => {
    const mockData = {currency: 'btc', value: 50000};

    render(<PriceItem data={mockData} />);

    expect(screen.getByText('50000')).toBeTruthy();
  });
});
