import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProjectStep1 from './ProjectStep1';

describe('<ProjectStep1 />', () => {
  test('it should mount', () => {
    render(<ProjectStep1 />);
    
    const projectStep1 = screen.getByTestId('ProjectStep1');

    expect(projectStep1).toBeInTheDocument();
  });
});