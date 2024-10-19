import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import SearchField from '../../../components/SearchField/SearchField';

describe('SearchField', () => {
  it('renders the search input with the correct placeholder', () => {
    render(<SearchField value="" onSearch={jest.fn()} />);

    expect(screen.getByPlaceholderText('Search Cryptocurrencies')).toBeTruthy();
  });

  it('renders with the correct initial value', () => {
    const initialValue = 'bitcoin';
    render(<SearchField value={initialValue} onSearch={jest.fn()} />);

    const input = screen.getByDisplayValue(initialValue);
    expect(input).toBeTruthy();
  });

  it('calls onSearch when the input value changes', () => {
    const onSearchMock = jest.fn();
    render(<SearchField value="" onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText('Search Cryptocurrencies');
    fireEvent.changeText(input, 'ethereum');

    expect(onSearchMock).toHaveBeenCalledWith('ethereum');
  });
});
