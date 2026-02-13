package com.laptopshop.backend.repository;

import com.laptopshop.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Tìm kiếm người dùng theo username (phục vụ đăng nhập)
    Optional<User> findByUsername(String username);
}