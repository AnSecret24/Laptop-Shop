package com.laptopshop.backend.controller;

import com.laptopshop.backend.entity.User;
import com.laptopshop.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*") // Để React sau này gọi được
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        // Trả về chuỗi JWT Token nếu đăng nhập thành công
        return authService.login(user.getUsername(), user.getPassword());
    }
}