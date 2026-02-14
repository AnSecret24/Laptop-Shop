package com.laptopshop.backend.service;

import com.laptopshop.backend.entity.Laptop;
import com.laptopshop.backend.repository.LaptopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LaptopService {
    @Autowired
    private LaptopRepository laptopRepository;

    // Lấy danh sách tất cả laptop
    public List<Laptop> getAllLaptops() {
        return laptopRepository.findAll();
    }

    // Lưu một laptop mới
    public Laptop saveLaptop(Laptop laptop) {
        return laptopRepository.save(laptop);
    }

    // Lấy chi tiết 1 laptop theo ID
    public Laptop getLaptopById(Long id) {
        return laptopRepository.findById(id).orElse(null);
    }

    // Xóa laptop
    public void deleteLaptop(Long id) {
        laptopRepository.deleteById(id);
    }

    public Laptop updateLaptop(Long id, Laptop details) {
        Laptop laptop = laptopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy laptop ID: " + id));

        laptop.setName(details.getName());
        laptop.setPrice(details.getPrice());
        laptop.setDescription(details.getDescription());
        laptop.setQuantity(details.getQuantity());
        laptop.setImageUrl(details.getImageUrl());

        return laptopRepository.save(laptop);
    }
}