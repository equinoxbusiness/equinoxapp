import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DashboardHeader from './DashboardHeader';

describe('<DashboardHeader />', () => {
  test('it should mount', () => {
    render(<DashboardHeader />);
    
    const dashboardHeader = screen.getByTestId('DashboardHeader');

    expect(dashboardHeader).toBeInTheDocument();
  });
});