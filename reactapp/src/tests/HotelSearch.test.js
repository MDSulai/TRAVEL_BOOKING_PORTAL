import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HotelSearch from '../components/HotelSearch';

describe('HotelSearch', () => {
  const defaultProps = { onSearch: jest.fn(), loading: false };

  it('renders form fields', () => {
    render(<HotelSearch {...defaultProps} />);
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Minimum Rating/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Maximum Price per Night/i)).toBeInTheDocument();
    expect(screen.getByTestId('search-hotel-btn')).toBeInTheDocument();
  });

  it('shows validation error for no location', () => {
    render(<HotelSearch {...defaultProps} />);
    fireEvent.click(screen.getByTestId('search-hotel-btn'));
    expect(screen.getByText(/Select location/i)).toBeInTheDocument();
  });

  it('shows validation for negative max price', () => {
    render(<HotelSearch {...defaultProps} />);
    fireEvent.change(screen.getByTestId('location-input'), { target: { value: 'Delhi' } });
    fireEvent.change(screen.getByTestId('max-price-input'), { target: { value: '-999' } });
    fireEvent.click(screen.getByTestId('search-hotel-btn'));
    expect(screen.getByText(/should be positive/)).toBeInTheDocument();
  });

  it('calls onSearch with correct fields', () => {
    const onSearch = jest.fn();
    render(<HotelSearch onSearch={onSearch} loading={false} />);
    fireEvent.change(screen.getByTestId('location-input'), { target: { value: 'Delhi' } });
    fireEvent.change(screen.getByTestId('min-rating-input'), { target: { value: '3' } });
    fireEvent.change(screen.getByTestId('max-price-input'), { target: { value: '4500' } });
    fireEvent.click(screen.getByTestId('search-hotel-btn'));
    expect(onSearch).toHaveBeenCalledWith('Delhi', 3, 4500);
  });
});
