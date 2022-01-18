import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateReqStep2 from './CreateReqStep2';

describe('<CreateReqStep2 />', () => {
  test('it should mount', () => {
    render(<CreateReqStep2 />);
    
    const createReqStep2 = screen.getByTestId('CreateReqStep2');

    expect(createReqStep2).toBeInTheDocument();
  });
});