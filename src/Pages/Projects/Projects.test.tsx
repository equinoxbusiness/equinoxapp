import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Projects from './Projects';

describe('<Projects />', () => {
  test('it should mount', () => {
    render(<Projects />);
    
    const projects = screen.getByTestId('Projects');

    expect(projects).toBeInTheDocument();
  });
});