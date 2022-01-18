import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MemberCreated from './MemberCreated';

describe('<MemberCreated />', () => {
  test('it should mount', () => {
    render(<MemberCreated />);
    
    const memberCreated = screen.getByTestId('MemberCreated');

    expect(memberCreated).toBeInTheDocument();
  });
});