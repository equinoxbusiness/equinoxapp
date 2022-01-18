import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateICOstep1 from './CreateICOstep1';

describe('<CreateICOstep1 />', () => {
  test('it should mount', () => {
    render(<CreateICOstep1 />);
    
    const createIcOstep1 = screen.getByTestId('CreateICOstep1');

    expect(createIcOstep1).toBeInTheDocument();
  });
});