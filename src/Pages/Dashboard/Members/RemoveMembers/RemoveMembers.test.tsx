import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RemoveMembers from './RemoveMembers';

describe('<RemoveMembers />', () => {
  test('it should mount', () => {
    render(<RemoveMembers />);
    
    const removeMembers = screen.getByTestId('RemoveMembers');

    expect(removeMembers).toBeInTheDocument();
  });
});