package com.rdfj.tareas.dto;

import jakarta.validation.constraints.NotBlank;


public class LoginRequest {
    @NotBlank(message = "El email no puede estar vacio")
    private String email;
    
    @NotBlank(message = "La contraseña no puede estar vacia")
    private String password;

    public LoginRequest() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    
}
