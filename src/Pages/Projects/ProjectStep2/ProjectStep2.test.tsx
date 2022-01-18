import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProjectStep2 from './ProjectStep2';

describe('<ProjectStep2 />', () => {
  test('it should mount', () => {
    render(<ProjectStep2 />);
    
    const projectStep2 = screen.getByTestId('ProjectStep2');

    expect(projectStep2).toBeInTheDocument();
  });
});