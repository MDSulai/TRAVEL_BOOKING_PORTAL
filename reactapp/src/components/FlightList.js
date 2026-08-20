import React from "react";

function FlightList({ flights = [], onBook, bookingId, error }) {
    if (!flights.length) {
        return <p>No flights found</p>;
    }

    return (
        <div>
            <h2>Available Flights</h2>

            {error && (
                <p data-testid="book-error">
                    [Error - You need to specify the message]
                </p>
            )}

            {flights.map((flight) => {
                const soldOut = flight.availableSeats <= 0;
                const booked = bookingId === flight.id;

                return (
                    <div key={flight.id}>
                        <h3>{flight.airline}</h3>

                        <p>Flight: {flight.flightNumber}</p>
                        <p>
                            {flight.origin} → {flight.destination}
                        </p>

                        <p>
                            Departure: {flight.departureTime}
                        </p>

                        <p>
                            Arrival: {flight.arrivalTime}
                        </p>

                        <p>Price: ₹{flight.price}</p>

                        <p>
                            Available Seats: {flight.availableSeats}
                        </p>

                        <button
                            data-testid={`book-flight-${flight.id}`}
                            disabled={soldOut || booked}
                            onClick={() => onBook(flight.id)}
                        >
                            {soldOut
                                ? "Sold Out"
                                : booked
                                ? "Booked"
                                : "Book"}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default FlightList;