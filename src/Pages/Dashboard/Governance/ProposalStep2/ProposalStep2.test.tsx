import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProposalStep2 from './ProposalStep2';

describe('<ProposalStep2 />', () => {
  test('it should mount', () => {
    render(<ProposalStep2 />);
    
    const proposalStep2 = screen.getByTestId('ProposalStep2');

    expect(proposalStep2).toBeInTheDocument();
  });
});