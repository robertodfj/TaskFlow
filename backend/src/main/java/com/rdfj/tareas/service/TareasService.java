package com.rdfj.tareas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rdfj.tareas.repository.RepositorioTarea;
import com.rdfj.tareas.entity.Tareas;

@Service
public class TareasService {
    
    @Autowired
    private RepositorioTarea repositorioTareas;

    public List<Tareas> obtenerTodasLasTareas() {
        return repositorioTareas.findAll();
    }

    public Tareas obtenerTareaPorId(Integer id) {
        return repositorioTareas.findById(id).orElse(null);
    }

    public Tareas guardarTarea(Tareas tarea) {
        return repositorioTareas.save(tarea);
    }

    public void eliminarTarea(Integer id) {
        repositorioTareas.deleteById(id);
    }

}
