import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginRegister() {
  const [mode, setMode] = useState("login");
  const [data, setData] = useState({
    usuario: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const passwordsMatch = data.password === data.password2;

  function resetForm() {
    setData({ usuario: "", email: "", password: "", password2: "" });
    setError("");
  }

  function handleLogin() {
    setMode("login");
    resetForm();
  }

  function handleRegister() {
    setMode("register");
    resetForm();
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
    const body =
      mode === "login"
        ? { email: data.email, password: data.password }
        : { username: data.usuario, email: data.email, password: data.password, rol: "USER" };

    try {
      const res = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error en la solicitud");
      }

      if (mode === "login") {
        const result = await res.json();
        localStorage.setItem("token", result.token);
        const rol = result.rol || result.rol;
        localStorage.setItem("rol", rol)
        console.log(result);
        if (result.rol === "ADMIN"){
          navigate("/vista-admin")
        }else{
          navigate("/dashboard")
        }
      } else {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        setMode("login");
        resetForm();
      }
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDemoLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "demo@demo.com", password: "demo1234" }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al iniciar sesión con demo");
      }

      const result = await res.json();
      localStorage.setItem("token", result.token);
      alert("Estás accediendo como usuario demo. Puedes probar la aplicación sin registrarte.");
      navigate("/dashboard");
    } catch (error) {
      setError("No se puede iniciar la demo");
      console.log(error);
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
                  mode === "login" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                }`}
              >
                Iniciar sesión
              </button>
              <button
                onClick={handleRegister}
                className={`px-4 py-2 font-semibold rounded ${
                  mode === "register" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                }`}
              >
                Registrarse
              </button>
            </nav>
          </header>

          <form onSubmit={handleSubmit} className="grid gap-4">

            {/* Nombre de usuario solo en modo registro */}
            {mode === "register" && (
              <label>
                <span className="block mb-1 text-sm font-medium text-gray-200">Nombre de usuario</span>
                <input
                  type="text"
                  name="usuario"
                  value={data.usuario}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
              </label>
            )}

            {/* Email */}
            <label>
              <span className="block mb-1 text-sm font-medium text-gray-200">Email</span>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </label>

            {/* Contraseña */}
            <label>
              <span className="block mb-1 text-sm font-medium text-gray-200">Contraseña</span>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </label>

            {/* Repetir contraseña solo en modo registro */}
            {mode === "register" && (
              <label>
                <span className="block mb-1 text-sm font-medium text-gray-200">Repetir contraseña</span>
                <input
                  type="password"
                  name="password2"
                  value={data.password2}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
                {!passwordsMatch && data.password2 && (
                  <p className="text-sm text-red-500 mt-1">Las contraseñas no coinciden</p>
                )}
              </label>
            )}

            {/* Errores */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Botón principal */}
            <button
              type="submit"
              disabled={mode === "register" && !passwordsMatch}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors disabled:opacity-50"
            >
              {mode === "login" ? "Iniciar sesión" : "Registrarse"}
            </button>
          </form>

          <footer className="mt-6 text-sm text-gray-400 space-y-2">
            <details>
              <summary className="cursor-pointer hover:underline">¿Tienes problemas para iniciar sesión?</summary>
              <p>
                <a href="#" onClick={handleDemoLogin} className="text-blue-500 hover:underline">Probar sin iniciar sesión</a>
              </p>
            </details>
            <details>
              <summary className="cursor-pointer hover:underline">Accede como administrador</summary>
              <p>
                <Link to="/admin-create" className="text-blue-500 hover:underline">Click aquí</Link>
              </p>
            </details>
          </footer>
        </article>
      </section>
    </main>
  );
}