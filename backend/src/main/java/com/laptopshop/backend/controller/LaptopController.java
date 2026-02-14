package com.laptopshop.backend.controller;

import com.laptopshop.backend.entity.Laptop;
import com.laptopshop.backend.service.LaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/laptops")
@CrossOrigin("*")
public class LaptopController {

    @Autowired
    private LaptopService laptopService;

    // Lấy danh sách tất cả Laptop
    @GetMapping
    public List<Laptop> getAll() {
        return laptopService.getAllLaptops();
    }

    // Thêm mới Laptop
    @PostMapping
    public Laptop create(@RequestBody Laptop laptop) {
        return laptopService.saveLaptop(laptop);
    }

    // Lấy chi tiết 1 Laptop theo ID
    @GetMapping("/{id}")
    public Laptop getById(@PathVariable Long id) {
        return laptopService.getLaptopById(id);
    }

    // Xóa Laptop
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        laptopService.deleteLaptop(id);
        return "Đã xóa laptop có ID: " + id;
    }

    // Cập nhật Laptop (Đã đưa logic vào Service)
    @PutMapping("/{id}")
    public Laptop update(@PathVariable Long id, @RequestBody Laptop laptopDetails) {
        return laptopService.updateLaptop(id, laptopDetails);
    }
}