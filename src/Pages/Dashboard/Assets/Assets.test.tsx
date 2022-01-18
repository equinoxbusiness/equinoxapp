import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Assets from './Assets';

describe('<Assets />', () => {
  test('it should mount', () => {
    render(<Assets />);
    
    const assets = screen.getByTestId('Assets');

    expect(assets).toBeInTheDocument();
  });
});