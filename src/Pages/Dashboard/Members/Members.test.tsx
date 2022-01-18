import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Members from './Members';

describe('<Members />', () => {
  test('it should mount', () => {
    render(<Members />);
    
    const members = screen.getByTestId('Members');

    expect(members).toBeInTheDocument();
  });
});