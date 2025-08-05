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
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuarios usuario = repositorioUsuarios.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con email: " + email));

        return new CustomUserDetails(usuario);
    }
}