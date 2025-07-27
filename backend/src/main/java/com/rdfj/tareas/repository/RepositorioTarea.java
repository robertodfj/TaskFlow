package com.rdfj.tareas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rdfj.tareas.entity.Tareas;
import com.rdfj.tareas.entity.Usuarios;

public interface RepositorioTarea extends JpaRepository<Tareas, Integer> {
    List<Tareas> findByCreador(Usuarios creador);
}
