import React, { useState } from "react";

function HotelSearch({ onSearch, loading }) {
    const [location, setLocation] = useState("");
    const [rating, setRating] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!location) {
            newErrors.location = "Select location";
        }

        if (maxPrice !== "" && Number(maxPrice) < 0) {
            newErrors.price = "Maximum price should be positive";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onSearch(
                location,
                rating === "" ? "" : Number(rating),
                maxPrice === "" ? "" : Number(maxPrice)
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Search Hotels</h2>

            <label htmlFor="location-input">Location</label>
            <input
                id="location-input"
                data-testid="location-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
            />
            {errors.location && <p>{errors.location}</p>}

            <label htmlFor="min-rating-input">Minimum Rating</label>
            <input
                id="min-rating-input"
                data-testid="min-rating-input"
                type="number"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
            />

            <label htmlFor="max-price-input">
                Maximum Price per Night
            </label>
            <input
                id="max-price-input"
                data-testid="max-price-input"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
            {errors.price && <p>{errors.price}</p>}

            <button
                type="submit"
                data-testid="search-hotel-btn"
                disabled={loading}
            >
                {loading ? "Searching..." : "Search Hotels"}
            </button>
        </form>
    );
}

export default HotelSearch;