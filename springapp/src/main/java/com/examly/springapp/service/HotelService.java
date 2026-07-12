package com.examly.springapp.service;

import com.examly.springapp.model.Hotel;
import com.examly.springapp.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    public Hotel addHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id).orElse(null);
    }

    public List<Hotel> getByLocation(String location) {
        return hotelRepository.findByLocation(location);
    }

    public Hotel updateHotel(Long id, Hotel hotel) {

        Hotel old = hotelRepository.findById(id).orElse(null);

        if (old == null)
            return null;

        old.setName(hotel.getName());
        old.setLocation(hotel.getLocation());
        old.setRating(hotel.getRating());
        old.setPricePerNight(hotel.getPricePerNight());
        old.setAvailableRooms(hotel.getAvailableRooms());

        return hotelRepository.save(old);
    }

    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }
}