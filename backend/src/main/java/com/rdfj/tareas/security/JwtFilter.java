package com.rdfj.tareas.security;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.lang.NonNull;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
protected void doFilterInternal(@NonNull HttpServletRequest request,
                                @NonNull HttpServletResponse response,
                                @NonNull FilterChain filterChain)
        throws ServletException, IOException {

    String authorizationHeader = request.getHeader("Authorization");

    String email = null;
    String jwt = null;

    System.out.println("Request URI: " + request.getRequestURI());
    System.out.println("Authorization header: " + authorizationHeader);

    try {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            System.out.println("Token JWT extraído: " + jwt);
            email = jwtUtil.extractUsername(jwt); // ← devuelve el email
            System.out.println("Email extraído del token: " + email);
        }

        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            System.out.println("Autenticación ya establecida en contexto para usuario: " +
                    SecurityContextHolder.getContext().getAuthentication().getName());
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(email); // ← ahora se busca por email

            if (jwtUtil.tokenValido(jwt, userDetails.getUsername())) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
                System.out.println("Autenticación establecida para usuario: " + email);
            }
        }
    } catch (Exception e) {
        System.out.println("Error en JwtFilter: " + e.getMessage());
        e.printStackTrace();
    }

    filterChain.doFilter(request, response);
}
}
