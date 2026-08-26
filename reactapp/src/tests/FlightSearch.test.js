import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FlightSearch from '../components/FlightSearch';

describe('FlightSearch', () => {
  const defaultProps = { onSearch: jest.fn(), loading: false };

  it('renders form', () => {
    render(<FlightSearch {...defaultProps} />);
    expect(screen.getByLabelText(/Origin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Destination/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Departure Date/i)).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  it('shows validation errors when submitting blank', () => {
    render(<FlightSearch {...defaultProps} />);
    fireEvent.click(screen.getByTestId('search-button'));
    expect(screen.getByText(/Select origin/i)).toBeInTheDocument();
    expect(screen.getByText(/Select destination/i)).toBeInTheDocument();
    expect(screen.getByText(/Pick a date/i)).toBeInTheDocument();
  });

  it('shows error for same city', () => {
    render(<FlightSearch {...defaultProps} />);
    fireEvent.change(screen.getByTestId('origin-input'), { target: { value: 'Delhi' } });
    fireEvent.change(screen.getByTestId('destination-input'), { target: { value: 'Delhi' } });
    fireEvent.change(screen.getByTestId('date-input'), { target: { value: '2025-01-24' } });
    fireEvent.click(screen.getByTestId('search-button'));
    expect(screen.getByText(/must differ/i)).toBeInTheDocument();
  });

  it('shows error for past date', () => {
    render(<FlightSearch {...defaultProps} />);
    fireEvent.change(screen.getByTestId('origin-input'), { target: { value: 'Delhi' } });
    fireEvent.change(screen.getByTestId('destination-input'), { target: { value: 'Mumbai' } });
    fireEvent.change(screen.getByTestId('date-input'), { target: { value: '2023-02-15' } });
    fireEvent.click(screen.getByTestId('search-button'));
    expect(screen.getByText(/not be in past/i)).toBeInTheDocument();
  });

  it('calls onSearch if validation passes', () => {
    const onSearch = jest.fn();
    render(<FlightSearch onSearch={onSearch} loading={false} />);
    fireEvent.change(screen.getByTestId('origin-input'), { target: { value: 'Delhi' } });
    fireEvent.change(screen.getByTestId('destination-input'), { target: { value: 'Mumbai' } });
    fireEvent.change(screen.getByTestId('date-input'), { target: { value: '2050-01-26' } });
    fireEvent.click(screen.getByTestId('search-button'));
    expect(onSearch).toHaveBeenCalledWith('Delhi', 'Mumbai', '2050-01-26');
  });
});
