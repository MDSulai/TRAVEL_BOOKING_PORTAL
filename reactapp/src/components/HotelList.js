import React from "react";

function HotelList({
    hotels = [],
    onBook,
    bookingId,
    error
}) {
    if (!hotels.length) {
        return <p>No hotels found</p>;
    }

    return (
        <div>
            <h2>Available Hotels</h2>

            {error && <p>{error}</p>}

            {hotels.map((hotel) => {
                const soldOut = hotel.availableRooms <= 0;
                const booked = bookingId === hotel.id;

                return (
                    <div key={hotel.id}>
                        <h3>{hotel.name}</h3>

                        <p>Location: {hotel.location}</p>
                        <p>Rating: {hotel.rating}</p>
                        <p>
                            Price per night: ₹{hotel.pricePerNight}
                        </p>
                        <p>
                            Available Rooms: {hotel.availableRooms}
                        </p>

                        <button
                            disabled={soldOut || booked}
                            onClick={() => onBook(hotel.id)}
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

export default HotelList;