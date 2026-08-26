import React, { useEffect, useState } from "react";
import * as ApiService from "../utils/ApiService";
import '@testing-library/jest-dom';

function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            const data = await ApiService.getUserBookings();
            setBookings(data || []);
        } catch (error) {
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (bookingId) => {
        try {
            const updatedBooking =
                await ApiService.cancelBooking(bookingId);

            setBookings((currentBookings) =>
                currentBookings.map((booking) =>
                    booking.id === bookingId
                        ? updatedBooking
                        : booking
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <p>Loading bookings...</p>;
    }

    if (!bookings.length) {
        return <p>No bookings</p>;
    }

    const flightBookings = bookings.filter(
        (booking) => booking.bookingType === "FLIGHT"
    );

    const hotelBookings = bookings.filter(
        (booking) => booking.bookingType === "HOTEL"
    );

    return (
        <div>
            <h2>My Bookings</h2>

            {flightBookings.length > 0 && (
                <div>
                    <h3>Flight Bookings</h3>

                    {flightBookings.map((booking) => (
                        <div key={booking.id}>
                            <p>
                                Reference: {booking.bookingReference}
                            </p>

                            <p>
                                Flight #{booking.flightId}
                            </p>

                            <p>
                                Total Price: ₹{booking.totalPrice}
                            </p>

                            <p>{booking.status}</p>
                                                        <button
                                data-testid={`cancel-btn-${booking.id}`}
                                disabled={
                                    booking.status !== "CONFIRMED"
                                }
                                onClick={() =>
                                    handleCancel(booking.id)
                                }
                            >
                                Cancel
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {hotelBookings.length > 0 && (
                <div>
                    <h3>Hotel Bookings</h3>

                    {hotelBookings.map((booking) => (
                        <div key={booking.id}>
                            <p>
                                Reference: {booking.bookingReference}
                            </p>

                            <p>
                                Hotel #{booking.hotelId}
                            </p>

                            <p>
                                Total Price: ₹{booking.totalPrice}
                            </p>

                            <p>{booking.status}</p>

                            <button
                                data-testid={`cancel-btn-${booking.id}`}
                                disabled={
                                    booking.status !== "CONFIRMED"
                                }
                                onClick={() =>
                                    handleCancel(booking.id)
                                }
                            >
                                Cancel
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BookingList;