import { useEffect, useState } from "react";

export default function DashBoard() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/tareas/mostrar", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json()) // corregido aquí
      .then((data) => setTareas(data))
      .catch((err) => console.error("Error al obtener las tareas", err));
  }, []); 

  return (
    <main>
      <header>
        <h2>TaskFlow ®</h2>
        <h3>Tus tareas creadas</h3>
        <button>Crear Tarea</button>
        <table>
          <thead>
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Titulo</th>
              <th className="p-3">Descripcion</th>
              <th className="p-3">Creador</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Prioridad</th>
              <th className="p-3">Fecha Limite</th>
            </tr>
          </thead>
          <tbody> {/* corregido aquí */}
            {tareas.map((tarea) => (
              <tr key={tarea.id} className="border-t border-gray-600">
                <td className="p-3">{tarea.id}</td>
                <td className="p-3">{tarea.titulo}</td>
                <td className="p-3">{tarea.descripcion}</td>
                <td className="p-3">{tarea.creador}</td>
                <td className="p-3">{tarea.estado}</td>
                <td className="p-3">{tarea.prioridad}</td>
                <td className="p-3">{tarea.fechaLimite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </main>
  );
}