import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WithFormField from './WithFormField';

describe('<WithFormField />', () => {
  test('it should mount', () => {
    render(<WithFormField />);
    
    const withFormField = screen.getByTestId('WithFormField');

    expect(withFormField).toBeInTheDocument();
  });
});