package com.rdfj.tareas.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.rdfj.tareas.entity.Usuarios;
import com.rdfj.tareas.repository.RepositorioUsuarios;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private RepositorioUsuarios repositorioUsuarios;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Buscar usuario en la base de datos
        Usuarios usuario = repositorioUsuarios.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con username: " + username));

        // Devolver el usuario 
        return new CustomUserDetails(usuario);
    }
}
