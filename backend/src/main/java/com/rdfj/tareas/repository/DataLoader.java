package com.rdfj.tareas.repository;


import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.rdfj.tareas.entity.Usuarios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private RepositorioUsuarios RepositorioUsuarios;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (!RepositorioUsuarios.existsByEmail("demo@example.com")) {
            Usuarios demoUser = new Usuarios();
            demoUser.setUsername("demo");
            demoUser.setEmail("demo@example.com");
            demoUser.setPassword(passwordEncoder.encode("demo1234"));
            demoUser.setRol(Usuarios.Rol.USER);
            RepositorioUsuarios.save(demoUser);
            System.out.println("Usuario demo creado!");
        } else {
            System.out.println("Usuario demo ya existe.");
        }
    }
}
