const API_BASE_URL = "http://localhost:8080/api";

export const searchFlights = async (origin, destination, date) => {
    const response = await fetch(
        `${API_BASE_URL}/flights/search?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}`
    );

    if (!response.ok) {
        throw new Error("Failed to search flights");
    }

    return response.json();
};

export const searchHotels = async (location, rating, maxPrice) => {
    const params = new URLSearchParams();

    params.append("location", location);

    if (rating !== undefined && rating !== "") {
        params.append("rating", rating);
    }

    if (maxPrice !== undefined && maxPrice !== "") {
        params.append("maxPrice", maxPrice);
    }

    const response = await fetch(
        `${API_BASE_URL}/hotels/search?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error("Failed to search hotels");
    }

    return response.json();
};

export const bookFlight = async (flightId, userId) => {
    const response = await fetch(
        `${API_BASE_URL}/bookings/flight?flightId=${flightId}&userId=${userId}`,
        {
            method: "POST"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to book flight");
    }

    return response.json();
};

export const bookHotel = async (hotelId, userId, nights) => {
    const response = await fetch(
        `${API_BASE_URL}/bookings/hotel?hotelId=${hotelId}&userId=${userId}&nights=${nights}`,
        {
            method: "POST"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to book hotel");
    }

    return response.json();
};

export const getUserBookings = async (userId = 1) => {
    const response = await fetch(
        `${API_BASE_URL}/bookings/user/${userId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch bookings");
    }

    return response.json();
};

export const cancelBooking = async (bookingId) => {
    const response = await fetch(
        `${API_BASE_URL}/bookings/cancel/${bookingId}`,
        {
            method: "PUT"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to cancel booking");
    }

    return response.json();
};