package com.rdfj.tareas.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rdfj.tareas.repository.RepositorioUsuarios;
import com.rdfj.tareas.security.CustomUserDetails;
import com.rdfj.tareas.security.JwtUtil;
import com.rdfj.tareas.dto.AuthResponse;
import com.rdfj.tareas.dto.LoginRequest;
import com.rdfj.tareas.dto.RegisterRequest;
import com.rdfj.tareas.entity.Usuarios;

@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RepositorioUsuarios repositorioUsuarios;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    
    /**
     * Endpoint para el registro de nuevos usuarios.
     * @param registerRequest
     * @return ResponseEntity 
     */

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        try {
            Optional <Usuarios> usuarioExistente = repositorioUsuarios.findByUsername(request.getUsername());
            if (usuarioExistente.isPresent()) {
            return ResponseEntity.badRequest().body("El usuario ya existe");
            }
        
            Usuarios nuevoUsuario = new Usuarios();
            nuevoUsuario.setUsername(request.getUsername());
            nuevoUsuario.setEmail(request.getEmail());
            nuevoUsuario.setPassword(passwordEncoder.encode(request.getPassword()));
            nuevoUsuario.setRol(request.getRol()); // Para poder crear user admin necesidad de contraseña en el frontend
            repositorioUsuarios.save(nuevoUsuario);
            return ResponseEntity.ok("Usuario registrado exitosamente");
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Error al registrar el usuario: " + ex.getMessage());
        }

        
    }

    /**
     * Endpoint para el login de usuarios.
     * @param loginRequest
     * @return AuthResponse 
     */

    @PostMapping("/login")
        public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
            try {

            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(), 
                    loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails.getUsername());

        return ResponseEntity.ok(new AuthResponse(token, userDetails.getUsername(), userDetails.getAuthorities().toString()));
    } catch (Exception ex) {
        return ResponseEntity.status(401).body(new AuthResponse("Credenciales inválidas", null, null));
    }
}

}

