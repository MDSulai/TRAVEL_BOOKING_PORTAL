package com.examly.springapp.service;

import com.examly.springapp.model.Flight;
import com.examly.springapp.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    public Flight addFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Flight getFlightById(Long id) {
        return flightRepository.findById(id).orElse(null);
    }

    public List<Flight> searchFlights(String origin,
                                      String destination,
                                      LocalDateTime start,
                                      LocalDateTime end) {

        return flightRepository
                .findByOriginAndDestinationAndDepartureTimeBetween(
                        origin,
                        destination,
                        start,
                        end);
    }

    public Flight updateFlight(Long id, Flight flight) {

        Flight old = flightRepository.findById(id).orElse(null);

        if (old == null)
            return null;

        old.setFlightNumber(flight.getFlightNumber());
        old.setAirline(flight.getAirline());
        old.setOrigin(flight.getOrigin());
        old.setDestination(flight.getDestination());
        old.setDepartureTime(flight.getDepartureTime());
        old.setArrivalTime(flight.getArrivalTime());
        old.setPrice(flight.getPrice());
        old.setAvailableSeats(flight.getAvailableSeats());

        return flightRepository.save(old);
    }

    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }
}