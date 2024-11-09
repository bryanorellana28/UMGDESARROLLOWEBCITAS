// components/Sidebar.tsx
import React from 'react';
import { useRouter } from 'next/router';

interface SidebarProps {
  userRole: string | null;
  email: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, email }) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el JWT del localStorage
    router.push('/login'); // Redirige a la página de login
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-gray-100 p-5 flex flex-col justify-between shadow-lg">
      <div>
        {/* Información del usuario */}
        <div className="mb-8 p-4 bg-gray-800 rounded-lg shadow-inner">
          {email && (
            <p className="text-xs text-gray-400">
              <span className="font-semibold text-gray-300">Email:</span> {email}
            </p>
          )}
          {userRole && (
            <p className="text-xs text-gray-400">
              <span className="font-semibold text-gray-300">Rol:</span> {userRole}
            </p>
          )}
        </div>
        
        {/* Título del menú */}
        <h2 className="text-lg font-semibold mb-5 tracking-wide">Menú</h2>

        {/* Opciones de menú */}
        <ul className="space-y-3">
          {userRole === 'Paciente' && (
            <>
             <li>
                <button
                  onClick={() => handleNavigation('/dashboard')}
                  className="w-full flex items-center text-sm p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-200"
                >
                  <span className="mr-3 text-gray-400">📅</span>
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/assign-appointment')}
                  className="w-full flex items-center text-sm p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-200"
                >
                  <span className="mr-3 text-gray-400">📅</span>
                  Asignar Cita
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/ver-citas')}
                  className="w-full flex items-center text-sm p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-200"
                >
                  <span className="mr-3 text-gray-400">🔍</span>
                  Ver Cita
                </button>
              </li>
            </>
          )}
          {userRole === 'Medico' && (
            <li>
                <button
                  onClick={() => handleNavigation('/dashboard')}
                  className="w-full flex items-center text-sm p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-200"
                >
                  <span className="mr-3 text-gray-400">📅</span>
                  Dashboard
                </button>
              <button
                onClick={() => handleNavigation('/ver-citas-doctor')}
                className="w-full flex items-center text-sm p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-200"
              >
                <span className="mr-3 text-gray-400">📋</span>
                Ver Cita
              </button>
            
            </li>
          )}
          {userRole === 'Administrador' && (
            <>
              <li>
                <button
                  onClick={() => handleNavigation('/view-appointment')}
                  className="w-full flex items-center text-sm p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-200"
                >
                  <span className="mr-3 text-gray-400">📋</span>
                  Ver Cita
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/register-user')}
                  className="w-full flex items-center text-sm p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-200"
                >
                  <span className="mr-3 text-gray-400">➕</span>
                  Registrar
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Botón de cerrar sesión */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center text-sm p-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition duration-200"
        >
          <span className="mr-3">🚪</span>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;