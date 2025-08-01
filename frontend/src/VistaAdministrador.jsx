import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VistaAdmin() {
  const [tareas, setTareas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

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
        if (!res.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return res.json();
      })
      .then((data) => setTareas(data))
      .catch((err) => console.error("Error al cargar las tareas:", err));
  }, [navigate]);

  function eliminarTarea(id) {
    const confirmar = window.confirm("¿Estás seguro de eliminar esta tarea?");
    if (!confirmar) return;

    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/tareas/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al eliminar la tarea");
        }
        setTareas((prev) => prev.filter((t) => t.id !== id));
      })
      .catch((err) => console.error("Error:", err));
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <header className="flex justify-between items-center mb-5 p-3">
        <div>
          <h2 className="text-4xl font-bold">TaskFlow.</h2>
          <h3 className="text-xl text-gray-400">Todas las tareas (Admin)</h3>
        </div>

        <input
          type="text"
          placeholder="Busca tu tarea por el ID"
          className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
        />

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
                <td className="p-3">{tarea.estado}</td>
                <td className="p-3">{tarea.prioridad}</td>
                <td className="p-3">{tarea.fechaLimite}</td>
                <td className="p-3 space-x-2">
                  {/* Botón editar (en futuro puedes conectar a /editar-tarea/:id) */}
                  <button
                    onClick={() => navigate(`/editar-tarea/${tarea.id}`)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded text-black"
                  >
                    ✏️
                  </button>

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