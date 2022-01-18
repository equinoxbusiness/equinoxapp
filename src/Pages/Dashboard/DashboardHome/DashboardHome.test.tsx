import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DashboardHome from './DashboardHome';

describe('<DashboardHome />', () => {
  test('it should mount', () => {
    render(<DashboardHome />);
    
    const dashboardHome = screen.getByTestId('DashboardHome');

    expect(dashboardHome).toBeInTheDocument();
  });
});