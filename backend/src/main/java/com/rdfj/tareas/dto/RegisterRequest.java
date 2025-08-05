package com.rdfj.tareas.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import com.rdfj.tareas.entity.Usuarios.Rol;

public class RegisterRequest {

    @NotBlank(message = "El nombre de usuario no puede estar vacío")
    private String username;
    
    @NotBlank(message = "La contraseña no puede estar vacía")
    private String password;

    @NotBlank(message = "El email no puede estar vacío")
    private String email;
    
    @NotNull(message = "El rol no puede estar vacío")
    private Rol rol;

    public RegisterRequest() {}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }
}