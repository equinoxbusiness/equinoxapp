import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateReqStep1 from './CreateReqStep1';

describe('<CreateReqStep1 />', () => {
  test('it should mount', () => {
    render(<CreateReqStep1 />);
    
    const createReqStep1 = screen.getByTestId('CreateReqStep1');

    expect(createReqStep1).toBeInTheDocument();
  });
});