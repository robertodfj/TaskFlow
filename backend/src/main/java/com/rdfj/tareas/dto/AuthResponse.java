package com.rdfj.tareas.dto;

public class AuthResponse {
    private String token;
    private String username;
    private String rol;

    public AuthResponse() {
    }

    public AuthResponse(String token, String username, String rol) {
        this.token = token;
        this.username = username;
        this.rol = rol;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRol() {
        return rol;
    }

    public void setRole(String rol) {
        this.rol = rol;
    }
    
}

