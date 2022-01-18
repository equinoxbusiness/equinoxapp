import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MembersMain from './MembersMain';

describe('<MembersMain />', () => {
  test('it should mount', () => {
    render(<MembersMain />);
    
    const membersMain = screen.getByTestId('MembersMain');

    expect(membersMain).toBeInTheDocument();
  });
});