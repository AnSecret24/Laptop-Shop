package com.laptopshop.backend.repository;

import com.laptopshop.backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}