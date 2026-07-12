package com.examly.springapp.controller;

import com.examly.springapp.model.Booking;
import com.examly.springapp.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/flight")
    public Optional<Booking> bookFlight(
            @RequestParam Long flightId,
            @RequestParam Long userId) {

        return bookingService.createFlightBooking(flightId, userId);
    }

    @PostMapping("/hotel")
    public Optional<Booking> bookHotel(
            @RequestParam Long hotelId,
            @RequestParam Long userId,
            @RequestParam int nights) {

        return bookingService.createHotelBooking(hotelId, userId, nights);
    }

    @PutMapping("/cancel/{bookingId}")
    public Optional<Booking> cancelBooking(@PathVariable Long bookingId) {
        return bookingService.cancelBooking(bookingId);
    }
}