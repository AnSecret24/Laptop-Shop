package com.laptopshop.backend.controller;

import com.laptopshop.backend.entity.Laptop;
import com.laptopshop.backend.service.LaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/laptops")
@CrossOrigin("*") // Cho phép Frontend (React) gọi API này
public class LaptopController {
    @Autowired
    private LaptopService laptopService;

    @GetMapping
    public List<Laptop> getAll() {
        return laptopService.getAllLaptops();
    }

    @PostMapping
    public Laptop create(@RequestBody Laptop laptop) {
        return laptopService.saveLaptop(laptop);
    }

    // Lấy chi tiết: GET http://localhost:8080/api/laptops/{id}
    @GetMapping("/{id}")
    public Laptop getById(@PathVariable Long id) {
        return laptopService.getLaptopById(id);
    }

    // Xóa: DELETE http://localhost:8080/api/laptops/{id}
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        laptopService.deleteLaptop(id);
        return "Đã xóa laptop có ID: " + id;
    }

    // Cập nhật: PUT http://localhost:8080/api/laptops/{id}
    @PutMapping("/{id}")
    public Laptop update(@PathVariable Long id, @RequestBody Laptop laptop) {
        laptop.setId(id); // Đảm bảo cập nhật đúng máy theo ID trên URL
        return laptopService.updateLaptop(laptop);
    }
}