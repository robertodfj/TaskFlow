import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminCreate() {
  const [code, setCode] = useState('');
  const nav = useNavigate();
  const adminCode = "1080999";

  function handleSubmit(e) {
    e.preventDefault(); 
    if (code === adminCode) {
      nav("/admin-register"); 
    } else {
      alert("Código incorrecto");
    }
  }

  return (
    <main className="bg-gray-900 min-h-screen text-white flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl w-full">

        <article className="text-center md:text-left mr-7">
          <header>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">TaskFlow</h1>
          </header>
          <p className="mt-4 text-base sm:text-lg text-gray-300">
            ¿Quieres crear tu usuario admin?
          </p>
        </article>

        <section className="w-full md:max-w-sm p-6 bg-gray-800 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <p className="mb-2 text-sm sm:text-base">Introduce aquí tu código de verificación:</p>
            <input
              type="text"
              id="code"
              name="code"
              placeholder="Introduce aquí tu código."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold transition-colors"
            >
              Registrar admin
            </button>
          </form>

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

        </section>

      </div>
    </main>
  );
}