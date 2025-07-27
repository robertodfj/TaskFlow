package com.rdfj.tareas.dto;

import java.time.LocalDate;

import com.rdfj.tareas.entity.Tareas;


public class TareaDto {
    private int id;
    private String titulo;
    private String descripcion;
    private String creador; // Cambiado de Usuarios a String para simplificar
    private String estado;
    private String prioridad;
    private LocalDate fechaLimite; 

    public TareaDto() {
    }

    public TareaDto(Tareas tarea) {
    this.id = tarea.getId();
    this.titulo = tarea.getTitulo();
    this.descripcion = tarea.getDescripcion();
    this.creador = tarea.getCreador().getUsername();
    this.estado = tarea.getEstado();
    this.prioridad = tarea.getPrioridad();
    this.fechaLimite = tarea.getFechaLimite();
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

    public String getCreador() {
    return creador;
    }

    public void setCreador(String creador) {
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
