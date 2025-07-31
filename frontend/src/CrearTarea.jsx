import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CrearTarea() {
  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: "",
    descripcion: "",
    prioridad: "media",
    fechaLimite: "",
    estado: "pendiente",
  });

  const navigate = useNavigate();


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
    <main className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-4xl font-bold text-center">TaskFlow.</h2>
        <h3 className="text-xl text-gray-400 text-center">
          ¡Crea tu próxima tarea!
        </h3>

        <input
          name="titulo"
          value={nuevaTarea.titulo}
          onChange={handleChange}
          placeholder="Título"
          required
          className="border border-gray-600 bg-gray-900 p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <input
          name="descripcion"
          value={nuevaTarea.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          required
          className="border border-gray-600 bg-gray-900 p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="prioridad" className="text-sm font-medium text-gray-300">
            Prioridad
          </label>
          <div className="relative">
            <select
              id="prioridad"
              name="prioridad"
              value={nuevaTarea.prioridad}
              onChange={handleChange}
              required
              className="appearance-none w-full bg-gray-900 text-white p-3 pr-10 rounded-md border border-gray-600 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-600 transition duration-200"
            >
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <input
          type="date"
          name="fechaLimite"
          value={nuevaTarea.fechaLimite}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          required
          className="border border-gray-600 bg-gray-900 p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-4 py-3 rounded-md font-semibold transition duration-200"
        >
          Crear Tarea
        </button>
      </form>

      <button
        className="mt-6 bg-gray-700 hover:bg-gray-600 transition px-6 py-3 rounded-xl text-white font-semibold shadow-md"
        onClick={() => navigate("/dashboard")}
      >
        Ver todas las tareas
      </button>
    </main>
  );
}