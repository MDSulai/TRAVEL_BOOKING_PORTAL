package com.examly.springapp.model;

import com.examly.springapp.repository.HotelRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class HotelModelAndRepositoryTest {
    @Autowired
    private HotelRepository hotelRepository;

    @Test
    public void testHotelEntityAndRepositoryQueries() {
        Hotel hotel = new Hotel();
        hotel.setName("Hotel Blue");
        hotel.setLocation("Bangalore");
        hotel.setRating(5);
        hotel.setPricePerNight(4000.0);
        hotel.setAvailableRooms(20);
        hotelRepository.save(hotel);
        List<Hotel> byLoc = hotelRepository.findByLocation("Bangalore");
        Assertions.assertFalse(byLoc.isEmpty());
        List<Hotel> byRating = hotelRepository.findByRatingGreaterThanEqual(4);
        Assertions.assertFalse(byRating.isEmpty());
        List<Hotel> byPrice = hotelRepository.findByPricePerNightLessThanEqual(4000.0);
        Assertions.assertFalse(byPrice.isEmpty());
    }
}
