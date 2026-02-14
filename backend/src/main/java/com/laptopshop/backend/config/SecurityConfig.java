package com.laptopshop.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration corsConfiguration = new CorsConfiguration();
                    corsConfiguration.setAllowedOrigins(List.of("http://localhost:5173"));
                    corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    corsConfiguration.setAllowedHeaders(List.of("*"));
                    return corsConfiguration;
                }))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // 1. Cho phép các API xác thực và danh sách sản phẩm
                        .requestMatchers("/api/auth/**", "/api/laptops/**").permitAll()

                        // 2. Khai báo CHI TIẾT đường dẫn revenue trước khi dùng dấu sao đại diện (**)
                        // Điều này giúp Spring Security nhận diện chính xác API thống kê
                        .requestMatchers("/api/orders/revenue").permitAll()

                        // 3. Cho phép tất cả các thao tác khác liên quan đến đơn hàng
                        .requestMatchers("/api/orders/**").permitAll()

                        .anyRequest().authenticated()
                );
        return http.build();
    }
}