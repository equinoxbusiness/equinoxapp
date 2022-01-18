import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AssetsMain from './AssetsMain';

describe('<AssetsMain />', () => {
  test('it should mount', () => {
    render(<AssetsMain />);
    
    const assetsMain = screen.getByTestId('AssetsMain');

    expect(assetsMain).toBeInTheDocument();
  });
});