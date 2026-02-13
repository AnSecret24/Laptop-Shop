package com.laptopshop.backend.service;

import com.laptopshop.backend.entity.User;
import com.laptopshop.backend.repository.UserRepository;
import com.laptopshop.backend.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils; // Tiêm máy in token vào đây

    public String login(String username, String password) {
        // 1. Tìm user trong DB theo username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng!"));

        // 2. Kiểm tra mật khẩu (so sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong DB)
        if (passwordEncoder.matches(password, user.getPassword())) {
            // 3. Nếu đúng mật khẩu, tạo và trả về chuỗi Token
            return jwtUtils.generateToken(username);
        } else {
            throw new RuntimeException("Mật khẩu không chính xác!");
        }
    }

    public User register(User user) {
        // 1. Mã hóa mật khẩu (ví dụ: "123" -> "$2a$10$...")
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 2. Gán quyền mặc định là USER
        user.setRole("ROLE_USER");

        // 3. Lưu vào database
        return userRepository.save(user);
    }
}