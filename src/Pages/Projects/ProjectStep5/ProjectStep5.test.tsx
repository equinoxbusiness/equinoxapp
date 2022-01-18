import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProjectStep5 from './ProjectStep5';

describe('<ProjectStep5 />', () => {
  test('it should mount', () => {
    render(<ProjectStep5 />);
    
    const projectStep5 = screen.getByTestId('ProjectStep5');

    expect(projectStep5).toBeInTheDocument();
  });
});