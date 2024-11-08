//borellana
import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para manejar errores
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token); // para implementar el jwt vamos a agregar en el ls el token
      router.push('/dashboard'); 
    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Error al iniciar sesión'); // Establecer mensaje de error
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold">Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          required
        />
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Mostrar mensaje de error */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mb-4">
          Iniciar Sesión
        </button>
        <button 
          onClick={() => router.push('/register')} // Redirigir a la página de registro
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Login;
