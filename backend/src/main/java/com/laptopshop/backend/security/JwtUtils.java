package com.laptopshop.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
    // Chìa khóa bí mật để ký token (chuỗi này phải dài ít nhất 32 ký tự)
    private final String SECRET_KEY = "YourSecretKeyForJWTAuthenticationYourSecretKeyForJWTAuthentication";
    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    private final int jwtExpirationMs = 86400000; // Token có hiệu lực trong 1 ngày

    // 1. Hàm tạo Token
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}