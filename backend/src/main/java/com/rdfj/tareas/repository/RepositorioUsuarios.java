package com.rdfj.tareas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rdfj.tareas.entity.Usuarios;

import java.util.Optional;

public interface RepositorioUsuarios extends JpaRepository<Usuarios, Integer> {
    boolean existsByUsername(String username);
    Optional<Usuarios> findByUsername(String username);
}
