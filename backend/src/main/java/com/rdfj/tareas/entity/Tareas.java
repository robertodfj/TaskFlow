package com.rdfj.tareas.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;
import jakarta.validation.constraints.*;

@Entity
public class Tareas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @NotBlank(message = "No puedes dejar el titulo en blanco")
    private String titulo;
    
    private String descripcion;

    @ManyToOne
    @JoinColumn (name = "usuario_id", nullable = false)
    private Usuarios creador; // Relación con la entidad Usuarios
    
    @NotBlank(message = "No puedes dejar el estado en blanco")
    private String estado; // pendinte o terminado
    
    private String prioridad; // alta, media o baja
    
    @FutureOrPresent(message = "La fecha debe ser del presente o futura")
    private LocalDate fechaLimite;

    public Tareas() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Usuarios getCreador() {
    return creador;
    }

    public void setCreador(Usuarios creador) {
    this.creador = creador;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(String prioridad) {
        this.prioridad = prioridad;
    }

    public LocalDate getFechaLimite() {
        return fechaLimite;
    }

    public void setFechaLimite(LocalDate fechaLimite) {
        this.fechaLimite = fechaLimite;
    }

    
    
}

