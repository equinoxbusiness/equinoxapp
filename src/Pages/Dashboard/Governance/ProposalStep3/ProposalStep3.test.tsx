import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProposalStep3 from './ProposalStep3';

describe('<ProposalStep3 />', () => {
  test('it should mount', () => {
    render(<ProposalStep3 />);
    
    const proposalStep3 = screen.getByTestId('ProposalStep3');

    expect(proposalStep3).toBeInTheDocument();
  });
});