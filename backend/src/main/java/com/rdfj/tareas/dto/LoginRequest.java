package com.rdfj.tareas.dto;

import jakarta.validation.constraints.NotBlank;


public class LoginRequest {
    @NotBlank(message = "El nombre de usuario no puede estar vacio")
    private String username;
    
    @NotBlank(message = "La contraseña no puede estar vacia")
    private String password;

    public LoginRequest() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    
}
