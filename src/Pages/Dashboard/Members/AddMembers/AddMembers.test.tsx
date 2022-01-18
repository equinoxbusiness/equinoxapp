import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddMembers from './AddMembers';

describe('<AddMembers />', () => {
  test('it should mount', () => {
    render(<AddMembers />);
    
    const addMembers = screen.getByTestId('AddMembers');

    expect(addMembers).toBeInTheDocument();
  });
});