import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddMember from './AddMember';

describe('<AddMember />', () => {
  test('it should mount', () => {
    render(<AddMember />);
    
    const addMember = screen.getByTestId('AddMember');

    expect(addMember).toBeInTheDocument();
  });
});