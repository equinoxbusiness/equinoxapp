import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Help from './Help';

describe('<Help />', () => {
  test('it should mount', () => {
    render(<Help />);
    
    const help = screen.getByTestId('Help');

    expect(help).toBeInTheDocument();
  });
});