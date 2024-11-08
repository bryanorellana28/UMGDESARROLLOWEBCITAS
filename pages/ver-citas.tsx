import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const VerCitas = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    // Extraer el correo del JWT
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUserEmail(decoded.email);
    }

    const fetchAppointments = async () => {
      const response = await fetch('/api/user-appointments', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al obtener las citas');
      }
    };

    fetchAppointments();
  }, [token]);

  // Filtrado de citas según estado y email
  const citasAsignadas = appointments.filter(
    (app) => app.estado === 'asignado' && app.email === userEmail
  );
  const citasPendientes = appointments.filter(
    (app) => app.estado === 'pendiente' && app.email === userEmail
  );
  const citasFinalizadas = appointments.filter(
    (app) => app.estado === 'finalizado' && app.email === userEmail
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar userRole="Paciente" email={userEmail} />

      <div className="flex-1 p-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-700">Mis Citas</h2>
        {error && <p className="text-red-500">{error}</p>}

        {/* Citas Asignadas */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-green-600 mb-4">Citas Asignadas</h3>
          {citasAsignadas.length === 0 ? (
            <p>No tienes citas asignadas.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {citasAsignadas.map((appointment) => (
                <div key={appointment.id} className="bg-white shadow-md rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-600">
                    {new Date(appointment.fecha).toLocaleDateString()}
                  </h4>
                  <p className="mt-1 text-gray-600"><strong>Doctor:</strong> {appointment.doctorAsignado}</p>
                  <p className="mt-1 text-gray-600"><strong>Hora:</strong> {appointment.hora} horas</p>
                  <p className="mt-1 text-gray-600"><strong>Descripción:</strong> {appointment.descripcion}</p>
                  <p className="mt-1 text-gray-600"><strong>Estado:</strong> Asignado</p>
                  
                  
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Citas Pendientes de Asignar */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-yellow-600 mb-4">Citas Pendientes de Asignar</h3>
          {citasPendientes.length === 0 ? (
            <p>No tienes citas pendientes de asignar.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {citasPendientes.map((appointment) => (
                <div key={appointment.id} className="bg-white shadow-md rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-600">
                    {new Date(appointment.fecha).toLocaleDateString()}
                  </h4>
                  <p className="mt-1 text-gray-600"><strong>Hora:</strong> {appointment.hora}</p>
                  <p className="mt-1 text-gray-600"><strong>Descripción:</strong> {appointment.descripcion}</p>
                  <p className="mt-1 text-gray-600"><strong>Estado:</strong> Pendiente</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Citas Finalizadas */}
        <section>
          <h3 className="text-xl font-semibold text-gray-500 mb-4">Citas Finalizadas</h3>
          {citasFinalizadas.length === 0 ? (
            <p>No tienes citas finalizadas.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {citasFinalizadas.map((appointment) => (
                <div key={appointment.id} className="bg-white shadow-md rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-600">
                    {new Date(appointment.fecha).toLocaleDateString()}
                  </h4>
                  <p className="mt-1 text-gray-600"><strong>Doctor:</strong> {appointment.doctorAsignado}</p>

                  <p className="mt-1 text-gray-600"><strong>Hora:</strong> {appointment.hora}</p>
                  <p className="mt-1 text-gray-600"><strong>Descripción:</strong> {appointment.descripcion}</p>
                  <p className="mt-1 text-gray-600"><strong>Estado:</strong> Finalizado</p>
                  <p className="mt-1 text-gray-600"><strong>Diagnostico:</strong> {appointment.revision}</p>

                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default VerCitas;