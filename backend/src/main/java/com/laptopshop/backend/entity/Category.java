package com.laptopshop.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "categories")
@Data // Tự động tạo Getter, Setter, toString bằng Lombok
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, columnDefinition = "NVARCHAR(255)")
    private String name;
}