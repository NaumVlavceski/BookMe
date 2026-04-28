package com.example.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiry-ms}")
    private long expiryMs;

    private SecretKey getSignature(){
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(Long userId,String role){
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claim("role",role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiryMs))
                .signWith(getSignature())
                .compact();
    }

    public Claims extractClaims(String token){
        return Jwts.parser()
                .verifyWith(getSignature())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    public Long extractUserId(String token){
        return Long.parseLong(extractClaims(token).getSubject());
    }

    public String extractRole(String token){
        return extractClaims(token).get("role",String.class);
    }

    public boolean isTokenExpired(String token){
        try {
            extractClaims(token);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
