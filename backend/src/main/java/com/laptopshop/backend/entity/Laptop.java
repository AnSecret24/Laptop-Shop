package com.laptopshop.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "laptops")
@Data
public class Laptop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "NVARCHAR(255)")
    private String name;

    private Double price;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String imageUrl;

    private Integer quantity;

    @ManyToOne // Nhiều Laptop thuộc về 1 Category
    @JoinColumn(name = "category_id")
    private Category category;
}