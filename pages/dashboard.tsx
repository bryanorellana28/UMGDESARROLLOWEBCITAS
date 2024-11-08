import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [citasPorMes, setCitasPorMes] = useState<{ [key: string]: number }>({});
  const [citasPorEstado, setCitasPorEstado] = useState<{ [key: string]: number }>({});
  const [totalCitas, setTotalCitas] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserRole(decodedToken.role);
    } else {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const obtenerEstadisticas = async () => {
      if (!userRole) return;

      const token = localStorage.getItem('token');
      const email = JSON.parse(atob(token!.split('.')[1])).email;

      try {
        const response = await fetch(`/api/dashboard-stats?email=${email}&role=${userRole}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener las estadísticas');
        }

        const data = await response.json();
        setCitasPorMes(data.citasPorMes);
        setCitasPorEstado(data.citasPorEstado);
        setTotalCitas(data.totalCitas);
      } catch (error) {
        console.error('Error en la API:', error);
        setError('Error al obtener las estadísticas');
      }
    };

    obtenerEstadisticas();
  }, [userRole]);

  // Graficar citas por mes con barras dinámicas
  const renderCitasPorMes = () => {
    return Object.entries(citasPorMes).map(([month, count]) => (
      <div key={month} className="flex items-center space-x-2 mt-2">
        <span className="text-gray-700 font-medium w-32">{month}</span>
        <div
          className="bg-blue-600 text-white text-xs flex items-center justify-center"
          style={{
            height: '30px',
            width: `${count * 20}px`,
            borderRadius: '8px',
          }}
        >
          {count}
        </div>
      </div>
    ));
  };

  // Graficar citas por estado con barras horizontales
  const renderCitasPorEstado = () => {
    return Object.entries(citasPorEstado).map(([estado, count]) => (
      <div key={estado} className="flex items-center space-x-2 mt-2">
        <span className="text-gray-700 font-medium w-32">{estado}</span>
        <div
          className="bg-green-500 text-white text-xs flex items-center justify-center"
          style={{
            height: '30px',
            width: `${count * 30}px`,
            borderRadius: '8px',
          }}
        >
          {count}
        </div>
      </div>
    ));
  };

  return (
    <div className="flex">
      <Sidebar userRole={userRole} />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Bienvenido al Dashboard</h1>
        {error && <p className="text-red-500">{error}</p>}

        {userRole && (
          <div className="absolute top-5 right-5 p-2 bg-gray-300 rounded-md shadow-md">
            <p className="font-semibold text-gray-700">Rol: {userRole}</p>
          </div>
        )}

        {/* Mostrar las estadísticas */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Estadísticas de Citas</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Total de Citas: <span className="font-semibold">{totalCitas}</span></p>
              <p className="text-gray-600">Asignadas: <span className="font-semibold">{citasPorEstado.asignado || 0}</span></p>
              <p className="text-gray-600">Pendientes: <span className="font-semibold">{citasPorEstado.pendiente || 0}</span></p>
              <p className="text-gray-600">Finalizadas: <span className="font-semibold">{citasPorEstado.finalizado || 0}</span></p>
            </div>
          </div>

          {/* Gráfico de citas por mes */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Citas por Mes</h3>
            <div className="mt-4">{renderCitasPorMes()}</div>
          </div>

          {/* Gráfico de citas por estado, debajo del gráfico de citas por mes */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Citas por Estado</h3>
            <div className="mt-4">{renderCitasPorEstado()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;