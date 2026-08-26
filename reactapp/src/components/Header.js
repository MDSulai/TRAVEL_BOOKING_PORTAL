import React from "react";
import { Link } from "react-router-dom";
import '@testing-library/jest-dom';

function Header() {
    return (
        <header>
            <h1>Travel Booking Portal</h1>

            <nav>
                <Link to="/">Home</Link>{" "}
                <Link to="/flights">Flights</Link>{" "}
                <Link to="/hotels">Hotels</Link>{" "}
                <Link to="/bookings">My Bookings</Link>
            </nav>
        </header>
    );
}

export default Header;