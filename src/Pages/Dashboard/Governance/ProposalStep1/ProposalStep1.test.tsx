import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProposalStep1 from './ProposalStep1';

describe('<ProposalStep1 />', () => {
  test('it should mount', () => {
    render(<ProposalStep1 />);
    
    const proposalStep1 = screen.getByTestId('ProposalStep1');

    expect(proposalStep1).toBeInTheDocument();
  });
});