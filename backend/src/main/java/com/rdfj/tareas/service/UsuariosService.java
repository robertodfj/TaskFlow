package com.rdfj.tareas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rdfj.tareas.entity.Usuarios;
import com.rdfj.tareas.repository.RepositorioUsuarios;

@Service
public class UsuariosService {

    @Autowired
    private RepositorioUsuarios repositorioUsuarios;

    public List<Usuarios> obtenerTodosLosUsuarios() {
        return repositorioUsuarios.findAll();
    }

    public Optional<Usuarios> obtenerUsuarioPorId(Integer id) {
        return repositorioUsuarios.findById(id);
    }

    public Usuarios guardarUsuario(Usuarios usuario) {
        return repositorioUsuarios.save(usuario);
    }

    public void eliminarUsuario(Integer id) {
        repositorioUsuarios.deleteById(id);
    }

    public boolean existeUsuarioPorUsername(String username) {
        return repositorioUsuarios.existsByUsername(username);
    }

}