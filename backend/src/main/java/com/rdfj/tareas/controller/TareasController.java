package com.rdfj.tareas.controller;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.rdfj.tareas.repository.RepositorioTarea;
import com.rdfj.tareas.repository.RepositorioUsuarios;
import com.rdfj.tareas.dto.TareaDto;
import com.rdfj.tareas.entity.Tareas;
import com.rdfj.tareas.entity.Usuarios;

@RestController
@RequestMapping("/tareas")
public class TareasController {
    
    @Autowired
    private RepositorioTarea repositorioTarea;

    @Autowired
    private RepositorioUsuarios repositorioUsuarios;
    
    // Crear Tarea
    @PostMapping("/crear")
    public ResponseEntity<TareaDto> crearTarea(@Valid @RequestBody Tareas tarea) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        Usuarios usuario = repositorioUsuarios.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        tarea.setCreador(usuario); // Asignar el creador de la tarea
        Tareas nuevaTarea = repositorioTarea.save(tarea);

        TareaDto tareaDto = new TareaDto(nuevaTarea);
        return ResponseEntity.ok(tareaDto);

    }

    // Mostrar tareas del usuario autenticado
    @GetMapping("/mostrar")
    public List<TareaDto> mostrarTareas() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Usuarios usuario = repositorioUsuarios.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        List<Tareas> tareasUsuario = repositorioTarea.findByCreador(usuario);
        return tareasUsuario.stream()
                .map(TareaDto::new)
                .toList();
    }

    // Mostrar todas las tareas (Solo admin users) 
    @GetMapping("/mostrar-todas")
    @PreAuthorize("hasRole('ADMIN')")
    public List<TareaDto> mostrarTodasLasTareas() {
        List<Tareas> tareas = repositorioTarea.findAll().stream()
        // Filtro para permitir probar sin iniciar sesion
        .filter(t -> !t.getCreador().getUsername().equals("demo"))
        .collect(Collectors.toList());

    return tareas.stream()
        .map(TareaDto::new)
        .toList();
    }

    // Buscar tarea por id
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Tareas obtenerTarea(@PathVariable int id){
        Optional<Tareas> tarea = repositorioTarea.findById(id);
        return tarea.orElse(null);
    }

    // Eliminar tarea
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> eliminarTarea(@PathVariable int id){
        repositorioTarea.deleteById(id);
        return ResponseEntity.ok("Tarea eliminada correctamente");
    }

    // Editar tarea
    @PutMapping("/editar/{id}")
    public ResponseEntity<?> editarTarea(@PathVariable int id, @RequestBody TareaDto tareaDto) {
        Optional<Tareas> optionalTarea = repositorioTarea.findById(id);

        if (optionalTarea.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarea no encontrada");
        }

        Tareas tarea = optionalTarea.get();

        tarea.setTitulo(tareaDto.getTitulo());
        tarea.setDescripcion(tareaDto.getDescripcion());
        tarea.setPrioridad(tareaDto.getPrioridad());
        tarea.setEstado(tareaDto.getEstado());
        tarea.setFechaLimite(tareaDto.getFechaLimite());

        repositorioTarea.save(tarea);

        return ResponseEntity.ok("Tarea actualizada con éxito");
    }


}