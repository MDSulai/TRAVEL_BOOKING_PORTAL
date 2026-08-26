import React, { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Header from "./components/Header";
import FlightSearch from "./components/FlightSearch";
import FlightList from "./components/FlightList";
import HotelSearch from "./components/HotelSearch";
import HotelList from "./components/HotelList";
import BookingList from "./components/BookingList";

import {
    searchFlights,
    searchHotels,
    bookFlight,
    bookHotel
} from "./utils/ApiService";

function Home() {
    return (
        <div>
            <h2>Welcome to Travel Booking Portal</h2>
            <p>
                Search and book flights and hotels easily.
            </p>
        </div>
    );
}

function Flights() {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bookingId, setBookingId] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async (
        origin,
        destination,
        date
    ) => {
        setLoading(true);
        setError("");

        try {
            const result = await searchFlights(
                origin,
                destination,
                date
            );

            setFlights(result || []);
        } catch (err) {
            setFlights([]);
            setError("Failed to search flights");
        } finally {
            setLoading(false);
        }
    };

    const handleBook = async (flightId) => {
        setError("");

        try {
            await bookFlight(flightId, 1);
            setBookingId(flightId);
        } catch (err) {
            setError("Failed to book flight");
        }
    };

    return (
        <div>
            <FlightSearch
                onSearch={handleSearch}
                loading={loading}
            />

            <FlightList
                flights={flights}
                onBook={handleBook}
                bookingId={bookingId}
                error={error}
            />
        </div>
    );
}
function Hotels() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bookingId, setBookingId] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async (
        location,
        rating,
        maxPrice
    ) => {
        setLoading(true);
        setError("");

        try {
            const result = await searchHotels(
                location,
                rating,
                maxPrice
            );

            setHotels(result || []);
        } catch (err) {
            setHotels([]);
            setError("Failed to search hotels");
        } finally {
            setLoading(false);
        }
    };

    const handleBook = async (hotelId) => {
        setError("");

        try {
            await bookHotel(hotelId, 1, 1);
            setBookingId(hotelId);
        } catch (err) {
            setError("Failed to book hotel");
        }
    };

    return (
        <div>
            <HotelSearch
                onSearch={handleSearch}
                loading={loading}
            />

            <HotelList
                hotels={hotels}
                onBook={handleBook}
                bookingId={bookingId}
                error={error}
            />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Header />

            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/flights"
                        element={<Flights />}
                    />

                    <Route
                        path="/hotels"
                        element={<Hotels />}
                    />

                    <Route
                        path="/bookings"
                        element={<BookingList />}
                    />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;