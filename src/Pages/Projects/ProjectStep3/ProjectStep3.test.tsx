import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProjectStep3 from './ProjectStep3';

describe('<ProjectStep3 />', () => {
  test('it should mount', () => {
    render(<ProjectStep3 />);
    
    const projectStep3 = screen.getByTestId('ProjectStep3');

    expect(projectStep3).toBeInTheDocument();
  });
});