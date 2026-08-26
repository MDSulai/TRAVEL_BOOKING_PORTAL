import React, { useState } from 'react';
import '@testing-library/jest-dom';

function FlightSearch({ onSearch, loading }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!origin) {
      newErrors.origin = 'Select origin';
    }

    if (!destination) {
      newErrors.destination = 'Select destination';
    }

    if (!date) {
      newErrors.date = 'Pick a date';
    }

    if (origin && destination && origin === destination) {
      newErrors.destination = 'Origin and destination must differ';
    }

    if (date) {
      const today = new Date();
      const selectedDate = new Date(date);

      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = 'Departure date must not be in past';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSearch(origin, destination, date);
    }
  };
    return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="origin">Origin</label>
        <select
          id="origin"
          data-testid="origin-input"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Kolkata">Kolkata</option>
        </select>

        {errors.origin && <p>{errors.origin}</p>}
      </div>

      <div>
        <label htmlFor="destination">Destination</label>
        <select
          id="destination"
          data-testid="destination-input"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Kolkata">Kolkata</option>
        </select>

        {errors.destination && <p>{errors.destination}</p>}
      </div>

      <div>
        <label htmlFor="date">Departure Date</label>
        <input
          id="date"
          type="date"
          data-testid="date-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {errors.date && <p>{errors.date}</p>}
      </div>

      <button
        type="submit"
        data-testid="search-button"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search Flights'}
      </button>
    </form>
  );
}

export default FlightSearch;