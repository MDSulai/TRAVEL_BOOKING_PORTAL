import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FlightList from '../components/FlightList';

describe('FlightList', () => {
  const flights = [
    { id: 1, airline: 'Indigo', flightNumber: 'F123', origin: 'Delhi', destination: 'Kolkata', departureTime: '2025-10-01T10:00:00', arrivalTime: '2025-10-01T13:00:00', price: 2000, availableSeats: 6 },
    { id: 2, airline: 'Air India', flightNumber: 'F321', origin: 'Bangalore', destination: 'Chennai', departureTime: '2025-11-15T12:00:00', arrivalTime: '2025-11-15T14:45:00', price: 2450, availableSeats: 0 },
  ];
  it('renders flights and disables Sold Out button', () => {
    render(<FlightList flights={flights} onBook={() => {}} bookingId={null} />);
    expect(screen.getByText(/Indigo/)).toBeInTheDocument();
    expect(screen.getByText(/F123/)).toBeInTheDocument();
    expect(screen.getByText(/Air India/)).toBeInTheDocument();
    expect(screen.getByTestId('book-flight-2')).toBeDisabled();
    expect(screen.getByTestId('book-flight-1')).not.toBeDisabled();
    expect(screen.getByText(/Sold Out/)).toBeInTheDocument();
  });
  it('shows empty message if no flights found', () => {
    render(<FlightList flights={[]} onBook={() => {}} bookingId={null} />);
    expect(screen.getByText(/no flights found/i)).toBeInTheDocument();
  });
  it('shows Booked button if just booked', () => {
    render(<FlightList flights={flights} onBook={() => {}} bookingId={1} />);
    expect(screen.getByTestId('book-flight-1')).toHaveTextContent(/Booked/);
  });
  it('Book button calls onBook', () => {
    const onBook = jest.fn();
    render(<FlightList flights={flights} onBook={onBook} bookingId={null} />);
    fireEvent.click(screen.getByTestId('book-flight-1'));
    expect(onBook).toHaveBeenCalledWith(1);
  });
  it('shows error if book error supplied', () => {
    render(<FlightList flights={flights} onBook={() => {}} bookingId={null} error="Failed" />);
    expect(screen.getByTestId('book-error')).toBeInTheDocument();
  });
});
