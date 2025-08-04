import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VistaAdmin() {
  const [tareas, setTareas] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetch("http://localhost:8080/tareas/mostrar-todas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => setTareas(data))
      .catch((err) => console.error("Error al cargar las tareas:", err));
  }, [navigate, token]);

  function eliminarTarea(id) {
    const confirmar = window.confirm("¿Estás seguro de eliminar esta tarea?");
    if (!confirmar) return;

    fetch(`http://localhost:8080/tareas/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar la tarea");
        setTareas((prev) => prev.filter((t) => t.id !== id));
      })
      .catch((err) => console.error("Error:", err));
  }

  const handleEstadoChange = (id, nuevoEstado) => {
    const tarea = tareas.find((t) => t.id === id);
    if (!tarea) return;

    const tareaActualizada = { ...tarea, estado: nuevoEstado };

    fetch(`http://localhost:8080/tareas/editar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tareaActualizada),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar tarea");
        setTareas((prev) =>
          prev.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t))
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <header className="flex justify-between items-center mb-5 p-3">
        <div>
          <h2 className="text-4xl font-bold">TaskFlow.</h2>
          <h3 className="text-xl text-gray-400">Todas las tareas (Admin)</h3>
        </div>

        <button
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          onClick={() => navigate("/crear-tarea")}
        >
          Crear Tarea
        </button>
      </header>

      <section className="overflow-x-auto">
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Título</th>
              <th className="p-3 text-left">Descripción</th>
              <th className="p-3 text-left">Creador</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Prioridad</th>
              <th className="p-3 text-left">Fecha Límite</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map((tarea) => (
              <tr key={tarea.id} className="border-t border-gray-700">
                <td className="p-3">{tarea.id}</td>
                <td className="p-3">{tarea.titulo}</td>
                <td className="p-3">{tarea.descripcion}</td>
                <td className="p-3">{tarea.creador}</td>
                <td className="p-3">
                  <select
                    value={tarea.estado}
                    onChange={(e) => handleEstadoChange(tarea.id, e.target.value)}
                    className="appearance-none bg-gray-900 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-600 transition duration-200"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En progreso</option>
                    <option value="hecha">Hecha</option>
                  </select>
                </td>
                <td className="p-3">{tarea.prioridad}</td>
                <td className="p-3">{tarea.fechaLimite}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => eliminarTarea(tarea.id)}
                    className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}