package com.laptopshop.backend.repository;

import com.laptopshop.backend.entity.Laptop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaptopRepository extends JpaRepository<Laptop, Long> {
}