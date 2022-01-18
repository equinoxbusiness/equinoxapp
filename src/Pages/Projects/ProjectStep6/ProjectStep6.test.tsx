import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProjectStep6 from './ProjectStep6';

describe('<ProjectStep6 />', () => {
  test('it should mount', () => {
    render(<ProjectStep6 />);
    
    const projectStep6 = screen.getByTestId('ProjectStep6');

    expect(projectStep6).toBeInTheDocument();
  });
});