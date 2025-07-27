package com.rdfj.tareas.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public class RegisterRequest {
    @NotBlank(message = "El nombre de usuario no puede estar vacio")
    private String username;
    
    @NotBlank(message = "La contraseña no puede estar vacia")
    private String password;
    
    @NotNull(message = "El rol no puede estar vacio")
    @NotNull(message = "El rol no puede estar vacio")
    private com.rdfj.tareas.entity.Usuarios.Rol rol; // ADMIN o USER
    
    public RegisterRequest() {
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

    public com.rdfj.tareas.entity.Usuarios.Rol getRol() {
        return rol;
    }

    public void setRol(com.rdfj.tareas.entity.Usuarios.Rol rol) {
        this.rol = rol;
    }
    
}

