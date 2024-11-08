// components/Register.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

const Register = () => {
  const [nombre, setNombre] = useState(''); // Agregar estado para nombre
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Paciente');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, email, password, role }), // Incluir nombre en el cuerpo
    });

    if (response.ok) {
      router.push('/login');
    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Error al registrarse');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold">Registro</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <input
          type="text"
          placeholder="Nombre" // Placeholder para nombre
          value={nombre} // Valor de nombre
          onChange={(e) => setNombre(e.target.value)} // Manejo de cambio
          className="mb-4 p-2 border rounded w-full"
          required
        />
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        >
          <option value="Paciente">Paciente</option>
          <option value="Medico">Medico</option>
        </select>
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded mb-4">
          Registrarse
        </button>
        <button 
          type="button" 
          onClick={() => router.push('/login')}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Regresar al Login
        </button>
      </form>
    </div>
  );
};

export default Register;
