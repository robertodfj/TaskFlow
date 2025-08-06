package com.rdfj.tareas.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;


import java.util.Date;

@Component
public class JwtUtil {
    // secret key JWT tokens
    @Value("${jwt.secret}")
    private  String SECRET_KEY;
    // tiempo de expiracion JWT tokens 
    @Value("${jwt.expiration.time:3153600000000}")
    private long EXPIRATION_TIME;

    
    // generacion JWT tokens
    public String generateToken(String email){
        try {
            return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new java.util.Date(System.currentTimeMillis()))
                .setExpiration(new java.util.Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
        } catch (JwtException | IllegalArgumentException e) {
            throw new JwtException("Error al generar el token JWT: " + e.getMessage());
        }
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean tokenExpirado(String token) {
        return fechaToken(token).before(new java.util.Date());
    }

    public boolean tokenValido(String token, String username) {
        return (extractUsername(token).equals(username) && !tokenExpirado(token));
    }

    public Date fechaToken(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Metodo extrar claim del token
    private <T> T extractClaim(String token, java.util.function.Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parser()
            .setSigningKey(SECRET_KEY)
            .parseClaimsJws(token)
            .getBody();
        } catch (JwtException | IllegalArgumentException e) {
            throw new JwtException("Token invalido o corrupto: " + e.getMessage());
        }
    }
}

