import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function LoginRegister() {
  const [mode, setMode] = useState("login");
  const [data, setData] = useState({
    usuario: "",
    password: "",
    password2: "",
  });

  function handleLogin() {
    setMode("login");
    resetForm();
  }

  function handleRegister() {
    setMode("register");
    resetForm();
  }

  function resetForm() {
    setData({ usuario: "", password: "", password2: "" });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  const passwordsMatch = data.password === data.password2;

  return (
    <main className="dark min-h-screen flex items-center justify-center bg-gray-900 text-white transition-colors">
      <section className="max-w-7xl w-full px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <article>
          <header>
            <h1 className="text-5xl md:text-7xl font-bold">TaskFlow</h1>
          </header>
          <p className="mt-4 text-lg text-gray-300">
            TaskFlow es una aplicación para gestionar tus tareas diarias.
            Organiza y haz seguimiento de tus actividades con seguridad y eficiencia.
          </p>
        </article>

        <article className="bg-gray-800 shadow-lg rounded-xl p-8">
          <header className="flex justify-between items-center mb-6">
            <nav className="space-x-4">
              <button
                onClick={handleLogin}
                className={`px-4 py-2 font-semibold rounded ${
                  mode === "login"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                Iniciar sesión
              </button>
              <button
                onClick={handleRegister}
                className={`px-4 py-2 font-semibold rounded ${
                  mode === "register"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                Registrarse
              </button>
            </nav>
          </header>

          <section>
            {mode === "login" && (
              <form onSubmit={(e) => e.preventDefault()} className="grid gap-4">
                <label>
                  <span className="block mb-1 text-sm font-medium text-gray-200">Usuario</span>
                  <input
                    type="text"
                    name="usuario"
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tu usuario"
                    value={data.usuario}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <span className="block mb-1 text-sm font-medium text-gray-200">Contraseña</span>
                  <input
                    type="password"
                    name="password"
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tu contraseña"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
                >
                  Iniciar sesión
                </button>
              </form>
            )}

            {mode === "register" && (
              <form onSubmit={(e) => e.preventDefault()} className="grid gap-4">
                <label>
                  <span className="block mb-1 text-sm font-medium text-gray-200">Usuario</span>
                  <input
                    type="text"
                    name="usuario"
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Elige un usuario"
                    value={data.usuario}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <span className="block mb-1 text-sm font-medium text-gray-200">Contraseña</span>
                  <input
                    type="password"
                    name="password"
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Crea una contraseña"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <span className="block mb-1 text-sm font-medium text-gray-200">Repetir contraseña</span>
                  <input
                    type="password"
                    name="password2"
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Repite la contraseña"
                    value={data.password2}
                    onChange={handleChange}
                    required
                  />
                </label>
                {!passwordsMatch && data.password2.length > 0 && (
                  <p className="text-sm text-red-500" aria-live="polite">
                    Las contraseñas no coinciden
                  </p>
                )}
                <input type="hidden" name="role" value="USER" />
                <button
                  type="submit"
                  disabled={!passwordsMatch}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors disabled:opacity-50"
                >
                  Registrarse
                </button>
              </form>
            )}
          </section>

          <footer className="mt-6 text-sm text-gray-400 space-y-2">
            <details>
              <summary className="cursor-pointer hover:underline">¿Tienes problemas para iniciar sesión?</summary>
              <p>
                <a href="#" className="text-blue-500 hover:underline">Olvidé mi contraseña</a>
              </p>
              <p>
                <a href="#" className="text-blue-500 hover:underline">Probar sin iniciar sesión</a>
              </p>
            </details>
            <details>
              <summary className="cursor-pointer hover:underline">Accede como administrador</summary>
              <p>
                <Link to="/admin-create" className="text-blue-500 hover:underline">
                  Click aquí
                </Link>
              </p>
            </details>
          </footer>
        </article>
      </section>
    </main>
  );
}