package com.examly.springapp.service;

import com.examly.springapp.model.Booking;
import com.examly.springapp.model.Flight;
import com.examly.springapp.repository.BookingRepository;
import com.examly.springapp.repository.FlightRepository;
import com.examly.springapp.repository.HotelRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class FlightBookingServiceTest {
    @Autowired
    private BookingService bookingService;
    @Autowired
    private FlightRepository flightRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private HotelRepository hotelRepository;

    @BeforeEach
    void setup() {
        bookingRepository.deleteAll();
        flightRepository.deleteAll();
        hotelRepository.deleteAll();
    }

    @Test
    public void testFlightBookingWithReferenceAndSeats() {
        Flight flight = new Flight();
        flight.setFlightNumber("F900");
        flight.setAirline("QuickJet");
        flight.setOrigin("Delhi");
        flight.setDestination("Mumbai");
        flight.setDepartureTime(java.time.LocalDateTime.now().plusDays(1));
        flight.setArrivalTime(java.time.LocalDateTime.now().plusDays(1).plusHours(2));
        flight.setPrice(2200.0);
        flight.setAvailableSeats(2);
        Flight saved = flightRepository.save(flight);
        Long flightId = saved.getId();
        Long userId = 99L;
        Booking booking = bookingService.createFlightBooking(flightId, userId).orElse(null);
        Assertions.assertNotNull(booking);
        Assertions.assertEquals("FLIGHT", booking.getBookingType());
        Assertions.assertTrue(booking.getBookingReference().startsWith("FL-"));
        Flight reloaded = flightRepository.findById(flightId).get();
        Assertions.assertEquals(1, reloaded.getAvailableSeats());

        // Booking when no seats
        reloaded.setAvailableSeats(0);
        flightRepository.save(reloaded);
        Booking failBooking = bookingService.createFlightBooking(flightId, userId).orElse(null);
        Assertions.assertNull(failBooking);
    }
}
