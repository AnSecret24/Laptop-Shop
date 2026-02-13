package com.laptopshop.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data // Tự động tạo Getter, Setter từ thư viện Lombok
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String fullName;

    // Lưu vai trò: ROLE_ADMIN hoặc ROLE_USER
    private String role;
}