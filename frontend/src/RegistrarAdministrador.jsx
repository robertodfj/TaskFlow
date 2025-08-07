import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminRegister() {
  const [data, setData] = useState({
    usuario: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function resetForm() {
    setData({ usuario: "", password: "", password2: "" });
    setError("");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  const passwordsMatch = data.password === data.password2;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!passwordsMatch) return;

    const body = {
      username: data.usuario,
      password: data.password,
      email: data.email,
      rol: "ADMIN",
    };

    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al registrar");
      }

      alert("Administrador registrado con éxito.");
      navigate("/"); // Redirigir al login
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="dark min-h-screen flex items-center justify-center bg-gray-900 text-white transition-colors">
      <section className="max-w-7xl w-full px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <article>
          <header>
            <h1 className="text-5xl md:text-7xl font-bold">TaskFlow</h1>
          </header>
          <p className="mt-4 text-lg text-gray-300">
            Crea tu usuario administrador.
          </p>
        </article>

        <article className="bg-gray-800 shadow-lg rounded-xl p-8">
          <section>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <label>
                <span className="block mb-1 text-sm font-medium text-gray-200">Usuario</span>
                <input
                  type="text"
                  name="usuario"
                  className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                  value={data.usuario}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <span className="block mb-1 text-sm font-medium text-gray-200">Correo Electronico</span>
                <input
                  type="email"
                  name="email"
                  className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <span className="block mb-1 text-sm font-medium text-gray-200">Contraseña</span>
                <input
                  type="password"
                  name="password"
                  className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
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
                  className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
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
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={!passwordsMatch}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors disabled:opacity-50"
              >
                Registrarse
              </button>
            </form>
          </section>

          <footer className="mt-6 text-sm text-gray-400 space-y-2">
            <details>
              <summary className="cursor-pointer hover:underline">Accede como administrador</summary>
              <p>
                Para acceder como administrador, contacta con el soporte técnico para obtener tu código de verificación.
                Una vez lo tengas, introdúcelo en el campo correspondiente y pulsa <strong>“Acceder”</strong>.
                Si el código es válido, serás redirigido automáticamente al formulario de registro de administradores.
              </p>
            </details>
          </footer>
        </article>
      </section>
    </main>
  );
}