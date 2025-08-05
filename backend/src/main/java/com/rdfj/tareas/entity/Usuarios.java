package com.rdfj.tareas.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Usuarios {
    public enum Rol{
        ADMIN,
        USER
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @NotBlank(message = "El nombre de usuario no puede estar vacio")
    @Column(unique = true)
    private String username;

    @NotBlank(message = "El email no puede estar vacio")
    @Column(unique = true)
    private String email;
    
    @NotBlank(message = "La contraseña no puede estar vacia")
    private String password;
    
    @NotNull(message = "El rol de usuario no puede estar vacio")
    @Enumerated(EnumType.STRING)
    private Rol rol; // "ADMIN" o "USER

    public Usuarios() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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
