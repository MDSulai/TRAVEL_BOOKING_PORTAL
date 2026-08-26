package com.examly.springapp.service;

import com.examly.springapp.model.Booking;
import com.examly.springapp.model.Flight;
import com.examly.springapp.model.Hotel;
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
public class CancelBookingServiceTest {
    @Autowired
    private BookingService bookingService;
    @Autowired
    private FlightRepository flightRepository;
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private BookingRepository bookingRepository;

    @BeforeEach
    void setup() {
        bookingRepository.deleteAll();
        flightRepository.deleteAll();
        hotelRepository.deleteAll();
    }

    @Test
    public void testCancelFlightBookingIdempotenceAndSeatRestore() {
        Flight flight = new Flight();
        flight.setFlightNumber("F2001");
        flight.setAirline("StarAir");
        flight.setOrigin("Delhi");
        flight.setDestination("Kolkata");
        flight.setDepartureTime(java.time.LocalDateTime.now().plusDays(1));
        flight.setArrivalTime(java.time.LocalDateTime.now().plusDays(1).plusHours(2));
        flight.setPrice(8000.0);
        flight.setAvailableSeats(1);
        Flight savedFlight = flightRepository.save(flight);
        Booking booking = bookingService.createFlightBooking(savedFlight.getId(), 77L).orElse(null);
        Assertions.assertNotNull(booking);
        savedFlight = flightRepository.findById(savedFlight.getId()).get();
        Assertions.assertEquals(0, savedFlight.getAvailableSeats());
        Booking cancelled = bookingService.cancelBooking(booking.getId()).orElse(null);
        Assertions.assertNotNull(cancelled);
        Assertions.assertEquals("CANCELLED", cancelled.getStatus());
        Flight afterCancel = flightRepository.findById(savedFlight.getId()).get();
        Assertions.assertEquals(1, afterCancel.getAvailableSeats());
        // Cancel again
        Booking second = bookingService.cancelBooking(booking.getId()).orElse(null);
        Assertions.assertNull(second);
    }

    @Test
    public void testCancelHotelBookingIdempotenceAndRoomRestore() {
        Hotel hotel = new Hotel();
        hotel.setName("PalmLeaf");
        hotel.setLocation("Goa");
        hotel.setRating(3);
        hotel.setPricePerNight(5500.0);
        hotel.setAvailableRooms(1);
        Hotel savedHotel = hotelRepository.save(hotel);
        Booking booking = bookingService.createHotelBooking(savedHotel.getId(), 57L, 2).orElse(null);
        Assertions.assertNotNull(booking);
        savedHotel = hotelRepository.findById(savedHotel.getId()).get();
        Assertions.assertEquals(0, savedHotel.getAvailableRooms());
        Booking cancelled = bookingService.cancelBooking(booking.getId()).orElse(null);
        Assertions.assertNotNull(cancelled);
        Assertions.assertEquals("CANCELLED", cancelled.getStatus());
        Hotel afterCancel = hotelRepository.findById(savedHotel.getId()).get();
        Assertions.assertEquals(1, afterCancel.getAvailableRooms());
        Booking second = bookingService.cancelBooking(booking.getId()).orElse(null);
        Assertions.assertNull(second);
    }
}
