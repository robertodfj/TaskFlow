import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
  const [tareas, setTareas] = useState([]);
  const [orden, setOrden] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetch("http://localhost:8080/tareas/mostrar", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTareas(data))
      .catch((err) => console.error("Error al obtener las tareas", err));
  }, [navigate, token]);

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

  function OrdenarPor(campo){
    const tareasOrdenadas = [...tareas].sort((a,b) => {
      let valorA = a[campo];
      let valorB = b[campo];

      if(valorA < valorB) return ordenAscendente ? -1 : 1;
      if(valorA > valorB) return ordenDescendente ? 1 : -1;
      return 0
    });

    setTareas(tareasOrdenadas);

  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <header className="flex justify-between items-center mb-5 p-3">
        <div>
          <h2 className="text-4xl font-bold">TaskFlow.</h2>
          <h3 className="text-xl text-gray-400">Tus tareas creadas</h3>
        </div>

        <button
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          onClick={() => navigate("/crear-tarea")}
        >
          Crear Tarea
        </button>
      </header>

      <section>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-4 text-left" >ID</th>
              <th className="p-3 text-left">Título</th>
              <th className="p-3 text-left">Descripción</th>
              <th className="p-3 text-left" onClick={() => ordenarPor("estado")}>Estado</th>
              <th className="p-3 text-left" onClick={() => ordenarPor("prioridad")}>Prioridad</th>
              <th className="text-left" onClick={() => ordenarPor("fechaLimite")}>Fecha Límite</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map((tarea) => (
              <tr key={tarea.id} className="border-t border-gray-600">
                <td className="p-3">{tarea.id}</td>
                <td className="p-3">{tarea.titulo}</td>
                <td className="p-3">{tarea.descripcion}</td>
                <td className="p-3">
                  <select
                    value={tarea.estado}
                    onChange={(e) =>
                      handleEstadoChange(tarea.id, e.target.value)
                    }
                    className="appearance-none w-full bg-gray-900 text-white p-2  rounded-md border border-gray-600 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-600 transition duration-200"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En progreso</option>
                    <option value="hecha">Hecha</option>
                  </select>
                </td>
                <td className="p-3">{tarea.prioridad}</td>
                <td className="p-3">{tarea.fechaLimite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}