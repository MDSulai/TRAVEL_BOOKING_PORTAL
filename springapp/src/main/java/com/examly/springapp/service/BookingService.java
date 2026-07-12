package com.examly.springapp.service;

import com.examly.springapp.model.Booking;
import com.examly.springapp.model.Flight;
import com.examly.springapp.model.Hotel;
import com.examly.springapp.repository.BookingRepository;
import com.examly.springapp.repository.FlightRepository;
import com.examly.springapp.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private HotelRepository hotelRepository;

    public Optional<Booking> createFlightBooking(Long flightId, Long userId) {

        Optional<Flight> optionalFlight = flightRepository.findById(flightId);

        if (optionalFlight.isEmpty()) {
            return Optional.empty();
        }

        Flight flight = optionalFlight.get();

        if (flight.getAvailableSeats() <= 0) {
            return Optional.empty();
        }

        flight.setAvailableSeats(flight.getAvailableSeats() - 1);
        flightRepository.save(flight);

        Booking booking = new Booking();

        booking.setBookingType("FLIGHT");
        booking.setBookingReference(
                "FL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        booking.setFlightId(flight.getId());
        booking.setUserId(userId);
        booking.setBookingDate(LocalDateTime.now());
        booking.setStatus("CONFIRMED");
        booking.setTotalPrice(flight.getPrice());

        return Optional.of(bookingRepository.save(booking));
    }
        public Optional<Booking> createHotelBooking(Long hotelId,
                                                Long userId,
                                                int nights) {

        Optional<Hotel> optionalHotel = hotelRepository.findById(hotelId);

        if (optionalHotel.isEmpty()) {
            return Optional.empty();
        }

        Hotel hotel = optionalHotel.get();

        if (hotel.getAvailableRooms() <= 0) {
            return Optional.empty();
        }

        hotel.setAvailableRooms(hotel.getAvailableRooms() - 1);
        hotelRepository.save(hotel);

        Booking booking = new Booking();

        booking.setBookingType("HOTEL");
        booking.setBookingReference(
                "HT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        booking.setHotelId(hotel.getId());
        booking.setUserId(userId);
        booking.setBookingDate(LocalDateTime.now());
        booking.setNights(nights);
        booking.setStatus("CONFIRMED");
        booking.setTotalPrice(hotel.getPricePerNight() * nights);

        return Optional.of(bookingRepository.save(booking));
    }
        public Optional<Booking> cancelBooking(Long bookingId) {

        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);

        if (optionalBooking.isEmpty()) {
            return Optional.empty();
        }

        Booking booking = optionalBooking.get();

        if ("CANCELLED".equals(booking.getStatus())) {
            return Optional.empty();
        }

        if ("FLIGHT".equals(booking.getBookingType())) {

            Flight flight = flightRepository
                    .findById(booking.getFlightId())
                    .orElse(null);

            if (flight != null) {
                flight.setAvailableSeats(flight.getAvailableSeats() + 1);
                flightRepository.save(flight);
            }

        } else if ("HOTEL".equals(booking.getBookingType())) {

            Hotel hotel = hotelRepository
                    .findById(booking.getHotelId())
                    .orElse(null);

            if (hotel != null) {
                hotel.setAvailableRooms(hotel.getAvailableRooms() + 1);
                hotelRepository.save(hotel);
            }
        }

        booking.setStatus("CANCELLED");

        return Optional.of(bookingRepository.save(booking));
    }

}