import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AllProjects from './AllProjects';

describe('<AllProjects />', () => {
  test('it should mount', () => {
    render(<AllProjects />);
    
    const allProjects = screen.getByTestId('AllProjects');

    expect(allProjects).toBeInTheDocument();
  });
});