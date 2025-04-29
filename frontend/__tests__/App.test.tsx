import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App Component', () => {
  it('renders ZapMath heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/ZapMath/i);
    expect(headingElement).toBeInTheDocument();
  });
}); 