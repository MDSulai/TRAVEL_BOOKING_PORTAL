package com.examly.springapp.service;

import com.examly.springapp.model.Booking;
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
public class HotelBookingServiceTest {
    @Autowired
    private BookingService bookingService;
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private FlightRepository flightRepository;

    @BeforeEach
    void setup() {
        bookingRepository.deleteAll();
        hotelRepository.deleteAll();
        flightRepository.deleteAll();
    }

    @Test
    public void testHotelBookingWithPricingAndRoomDecrement() {
        Hotel hotel = new Hotel();
        hotel.setName("Sea Shell");
        hotel.setLocation("Goa");
        hotel.setRating(4);
        hotel.setPricePerNight(1200.0);
        hotel.setAvailableRooms(2);
        Hotel saved = hotelRepository.save(hotel);
        Long hotelId = saved.getId();
        Long userId = 22L;
        int nights = 3;
        Booking booking = bookingService.createHotelBooking(hotelId, userId, nights).orElse(null);
        Assertions.assertNotNull(booking);
        Assertions.assertEquals("HOTEL", booking.getBookingType());
        Assertions.assertTrue(booking.getBookingReference().startsWith("HT-"));
        Assertions.assertEquals(1200.0 * 3, booking.getTotalPrice());
        Hotel reloaded = hotelRepository.findById(hotelId).get();
        Assertions.assertEquals(1, reloaded.getAvailableRooms());
        // Not enough rooms
        reloaded.setAvailableRooms(0);
        hotelRepository.save(reloaded);
        Booking failBooking = bookingService.createHotelBooking(hotelId, userId, nights).orElse(null);
        Assertions.assertNull(failBooking);
    }
}
