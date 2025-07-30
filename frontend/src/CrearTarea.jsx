import { useState } from "react";

export default function CrearTarea() {
  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: "",
    descripcion: "",
    prioridad: "media", // valor por defecto
    fechaLimite: "",
    estado: "pendiente", // siempre pendiente al crear
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNuevaTarea((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:8080/tareas/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(nuevaTarea),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al crear tarea");
        return res.json();
      })
      .then(() => {
        // limpiar formulario tras crear
        setNuevaTarea({
          titulo: "",
          descripcion: "",
          prioridad: "media",
          fechaLimite: "",
          estado: "pendiente",
        });
        alert("Tarea creada correctamente");
      })
      .catch((err) => {
        console.error(err);
        alert("Hubo un error al crear la tarea");
      });
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          name="titulo"
          value={nuevaTarea.titulo}
          onChange={handleChange}
          placeholder="Título"
          required
        />
        <input
          name="descripcion"
          value={nuevaTarea.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          required
        />
        <select
          name="prioridad"
          value={nuevaTarea.prioridad}
          onChange={handleChange}
          required
        >
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
        <input
          type="date"
          name="fechaLimite"
          value={nuevaTarea.fechaLimite}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          required
        />
        <button type="submit">Crear Tarea</button>
      </form>
    </main>
  );
}