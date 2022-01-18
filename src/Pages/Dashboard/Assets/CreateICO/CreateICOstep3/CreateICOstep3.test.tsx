import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateICOstep3 from './CreateICOstep3';

describe('<CreateICOstep3 />', () => {
  test('it should mount', () => {
    render(<CreateICOstep3 />);
    
    const createIcOstep3 = screen.getByTestId('CreateICOstep3');

    expect(createIcOstep3).toBeInTheDocument();
  });
});