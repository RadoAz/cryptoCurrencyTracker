import React from 'react';
import {Text} from 'react-native';
import {render, screen} from '@testing-library/react-native';
import DetailsBlock from '../../../components/DetailsBlock/DetailsBlock';

describe('DetailsBlock', () => {
  it('renders the title correctly', () => {
    const title = 'Block Title';

    render(
      <DetailsBlock title={title}>
        <Text>Child content</Text>
      </DetailsBlock>,
    );

    expect(screen.getByText(title)).toBeTruthy();
  });

  it('renders children correctly', () => {
    render(
      <DetailsBlock title="Sample Title">
        <Text testID="child-content">Child content</Text>
      </DetailsBlock>,
    );

    expect(screen.getByTestId('child-content')).toBeTruthy();
    expect(screen.getByText('Child content')).toBeTruthy();
  });
});
