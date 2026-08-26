package com.examly.springapp.model;

import com.examly.springapp.repository.FlightRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import java.time.LocalDateTime;
import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class FlightModelAndRepositoryTest {
    @Autowired
    private FlightRepository flightRepository;

    @Test
    public void testFlightEntityAndRepositoryQueries() {
        Flight flight = new Flight();
        flight.setFlightNumber("F001");
        flight.setAirline("SkyAir");
        flight.setOrigin("Delhi");
        flight.setDestination("Mumbai");
        flight.setDepartureTime(LocalDateTime.of(2025, 1, 1, 10, 0));
        flight.setArrivalTime(LocalDateTime.of(2025, 1, 1, 13, 0));
        flight.setPrice(5000.0);
        flight.setAvailableSeats(150);
        flightRepository.save(flight);
        List<Flight> byOriginDest = flightRepository.findByOriginAndDestinationAndDepartureTimeBetween(
                "Delhi", "Mumbai", LocalDateTime.of(2025, 1, 1, 0, 0), LocalDateTime.of(2025, 1, 1, 23, 59));
        Assertions.assertFalse(byOriginDest.isEmpty());
        List<Flight> byAirline = flightRepository.findByAirline("SkyAir");
        Assertions.assertFalse(byAirline.isEmpty());
        List<Flight> byPrice = flightRepository.findByPriceLessThanEqual(6000.0);
        Assertions.assertFalse(byPrice.isEmpty());
    }
}
