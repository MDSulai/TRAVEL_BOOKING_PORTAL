import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingList from './BookingList';

jest.mock('../utils/ApiService', () => ({
  getUserBookings: jest.fn(),
  cancelBooking: jest.fn()
}));

import * as ApiService from '../utils/ApiService';

describe('BookingList', () => {
  const flightBooking = {
    id: 92,
    bookingReference: 'FL-199244',
    bookingType: 'FLIGHT',
    flightId: 3,
    bookingDate: new Date().toISOString(),
    totalPrice: 2200,
    status: 'CONFIRMED'
  };
  const hotelBooking = {
    id: 112,
    bookingReference: 'HT-188211',
    bookingType: 'HOTEL',
    hotelId: 4,
    bookingDate: new Date().toISOString(),
    totalPrice: 3400,
    status: 'CONFIRMED'
  };
  beforeEach(() => {
    jest.clearAllMocks();
    ApiService.getUserBookings.mockResolvedValue([flightBooking, hotelBooking]);
  });
  it('groups bookings by type and renders details', async () => {
    render(<BookingList />);
    await waitFor(() => {
      expect(screen.getByText(/FL-199244/)).toBeInTheDocument();
    });
    expect(screen.getByText(/Hotel #4/)).toBeInTheDocument();
    expect(screen.getByText(/Flight #3/)).toBeInTheDocument();
    expect(screen.getAllByText(/CONFIRMED/).length).toBeGreaterThanOrEqual(1);
  });
  it('shows empty if none', async () => {
    ApiService.getUserBookings.mockResolvedValue([]);
    render(<BookingList />);
    await waitFor(() => {
      expect(screen.getByText(/no bookings|no bookings/i)).toBeInTheDocument();
    });
  });
  it('shows Cancel enabled for confirmed', async () => {
    render(<BookingList />);
    await waitFor(() => {
      const cancelBtn = screen.getByTestId('cancel-btn-92');
      expect(cancelBtn).not.toBeDisabled();
    });
  });
  it('disables Cancel if not confirmed', async () => {
    ApiService.getUserBookings.mockResolvedValue([{ ...flightBooking, status: 'CANCELLED' }]);
    render(<BookingList />);
    await waitFor(() => {
      expect(screen.getByTestId('cancel-btn-92')).toBeDisabled();
    });
  });
  it('calls cancelBooking and updates booking', async () => {
    ApiService.cancelBooking.mockImplementation(id => Promise.resolve({ ...flightBooking, id, status: 'CANCELLED' }));
    render(<BookingList />);
    await screen.findByTestId('cancel-btn-92');
    fireEvent.click(screen.getByTestId('cancel-btn-92'));
    await waitFor(() => {
      expect(ApiService.cancelBooking).toHaveBeenCalledWith(92);
    });
    await waitFor(() => {
      expect(screen.getByTestId('cancel-btn-92')).toBeDisabled();
    });
  });
});
