import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateICO from './CreateICO';

describe('<CreateICO />', () => {
  test('it should mount', () => {
    render(<CreateICO />);
    
    const createIco = screen.getByTestId('CreateICO');

    expect(createIco).toBeInTheDocument();
  });
});