import { useEffect, useState } from "react";

export default function DashBoard() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/tareas/mostrar", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTareas(data))
      .catch((err) => console.error("Error al obtener las tareas", err));
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <header className="flex justify-between items-center mb-5 p-3">
        <div>
          <h1 className="text-4xl font-bold">TaskFlow.</h1>
          <h2 className="text-xl text-gray-400">Tus tareas creadas</h2>
        </div>

        <input type="text" placeholder="Busca tu tarea por el ID" />

        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
          Crear Tarea
        </button>


      </header>

      <section>
        
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 text-left">ID</th>
              <th className="p-3 text-left">Título</th>
              <th className="p-3 text-left">Descripción</th>
              <th className="p-3 text-left">Creador</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Prioridad</th>
              <th className="p-2 text-left">Fecha Límite</th>
            </tr>
          </thead>
          <tbody>
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
      </section>
    </main>
  );
}