import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProjectStep4 from './ProjectStep4';

describe('<ProjectStep4 />', () => {
  test('it should mount', () => {
    render(<ProjectStep4 />);
    
    const projectStep4 = screen.getByTestId('ProjectStep4');

    expect(projectStep4).toBeInTheDocument();
  });
});