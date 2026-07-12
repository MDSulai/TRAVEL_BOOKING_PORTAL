package com.examly.springapp.repository;

import com.examly.springapp.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

    List<Hotel> findByLocation(String location);

    List<Hotel> findByRatingGreaterThanEqual(Integer rating);

    List<Hotel> findByPricePerNightLessThanEqual(Double price);
}