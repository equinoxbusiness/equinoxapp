import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateICOstep2 from './CreateICOstep2';

describe('<CreateICOstep2 />', () => {
  test('it should mount', () => {
    render(<CreateICOstep2 />);
    
    const createIcOstep2 = screen.getByTestId('CreateICOstep2');

    expect(createIcOstep2).toBeInTheDocument();
  });
});