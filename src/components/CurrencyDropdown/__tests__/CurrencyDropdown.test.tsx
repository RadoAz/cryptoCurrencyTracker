import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import CurrencyDropdown from '../CurrencyDropdown';

jest.mock('react-native-dropdown-select-list', () => {
  const {View, Text} = require('react-native');

  return {
    SelectList: ({
      data,
      setSelected,
      defaultOption,
    }: {
      data: {key: string; value: string}[];
      setSelected: (value: string) => void;
      defaultOption: {key: string; value: string};
    }) => (
      <View>
        <Text testID="default-option">{defaultOption.value}</Text>
        {data.map(item => (
          <Text key={item.key} onPress={() => setSelected(item.value)}>
            {item.value}
          </Text>
        ))}
      </View>
    ),
  };
});

describe('CurrencyDropdown', () => {
  const mockData = [
    {currency: 'usd', value: 1},
    {currency: 'eur', value: 0.85},
    {currency: 'gbp', value: 0.75},
  ];

  const mockOnSelect = jest.fn();

  it('renders the dropdown with the correct default option', () => {
    render(
      <CurrencyDropdown
        data={mockData}
        selected="usd"
        onSelect={mockOnSelect}
      />,
    );

    expect(screen.getByTestId('default-option').children[0]).toBe('USD');
  });

  it('renders all dropdown options correctly', () => {
    render(
      <CurrencyDropdown
        data={mockData}
        selected="usd"
        onSelect={mockOnSelect}
      />,
    );

    mockData.forEach(({currency}) => {
      const items = screen.getAllByText(currency.toUpperCase());
      expect(items.length).toBeGreaterThan(0);
    });
  });

  it('calls onSelect when an item is selected', () => {
    render(
      <CurrencyDropdown
        data={mockData}
        selected="usd"
        onSelect={mockOnSelect}
      />,
    );

    const eurItem = screen.getByText('EUR');
    fireEvent.press(eurItem);

    expect(mockOnSelect).toHaveBeenCalledWith('EUR');
  });
});
