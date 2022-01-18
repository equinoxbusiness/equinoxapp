import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateReq from './CreateReq';

describe('<CreateReq />', () => {
  test('it should mount', () => {
    render(<CreateReq />);
    
    const createReq = screen.getByTestId('CreateReq');

    expect(createReq).toBeInTheDocument();
  });
});