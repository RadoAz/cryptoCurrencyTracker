import React from 'react';
import {render, screen} from '@testing-library/react-native';
import FavoritesList from '../../../components/FavoritesList/FavoritesList';
import {NavigationContainer} from '@react-navigation/native';

describe('FavoritesList', () => {
  const Wrapper: React.FC<React.PropsWithChildren<{}>> = ({children}) => (
    <NavigationContainer>{children}</NavigationContainer>
  );

  it('renders a list of favorite items correctly', () => {
    const mockFavorites = [
      {id: '1', name: 'Bitcoin'},
      {id: '2', name: 'Ethereum'},
      {id: '3', name: 'Ripple'},
    ];

    render(
      <Wrapper>
        <FavoritesList favorites={mockFavorites} />
      </Wrapper>,
    );

    expect(screen.getByText('Bitcoin')).toBeTruthy();
    expect(screen.getByText('Ethereum')).toBeTruthy();
    expect(screen.getByText('Ripple')).toBeTruthy();
  });

  it('renders an empty list if no favorites are provided', () => {
    render(
      <Wrapper>
        <FavoritesList favorites={[]} />
      </Wrapper>,
    );

    expect(screen.queryByText('Bitcoin')).toBeNull();
    expect(screen.queryByText('Ethereum')).toBeNull();
    expect(screen.queryByText('Ripple')).toBeNull();
  });

  it('renders the correct number of FavoriteItem components', () => {
    const mockFavorites = [
      {id: '1', name: 'Bitcoin'},
      {id: '2', name: 'Ethereum'},
    ];

    render(
      <Wrapper>
        <FavoritesList favorites={mockFavorites} />
      </Wrapper>,
    );

    const favoriteItems = screen.getAllByText(/Bitcoin|Ethereum/);
    expect(favoriteItems.length).toBe(2);
  });
});
