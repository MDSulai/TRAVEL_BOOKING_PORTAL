package com.examly.springapp.repository;

import com.examly.springapp.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {

    List<Flight> findByOriginAndDestinationAndDepartureTimeBetween(
            String origin,
            String destination,
            LocalDateTime start,
            LocalDateTime end
    );

    List<Flight> findByAirline(String airline);

    List<Flight> findByPriceLessThanEqual(Double price);
}