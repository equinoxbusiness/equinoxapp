import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Governance from './Governance';

describe('<Governance />', () => {
  test('it should mount', () => {
    render(<Governance />);
    
    const governance = screen.getByTestId('Governance');

    expect(governance).toBeInTheDocument();
  });
});