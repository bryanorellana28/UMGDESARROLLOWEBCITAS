// pages/api/dashboard-stats.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getDashboardStatistics = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, role } = req.query;

  if (!email || !role) {
    return res.status(400).json({ message: 'Faltan parámetros de email o role' });
  }

  try {
    let citasPorMes: { [key: string]: number } = {};
    let citasPorEstado: { [key: string]: number } = {
      asignado: 0,
      pendiente: 0,
      finalizado: 0
    };
    let totalCitas = 0;

    // Asegurarnos de que email sea un string (en caso de que venga como array)
    const emailStr = Array.isArray(email) ? email[0] : email;

    const citas = await prisma.cita.findMany({
      where: role === 'Paciente'
        ? { email: emailStr }
        : { doctorAsignado: emailStr },
      select: {
        id: true,
        estado: true,
        fecha: true,
      },
    });

    totalCitas = citas.length;

    citas.forEach((cita) => {
      citasPorEstado[cita.estado] = (citasPorEstado[cita.estado] || 0) + 1;
      const monthYear = new Date(cita.fecha).toISOString().slice(0, 7); // "YYYY-MM"
      citasPorMes[monthYear] = (citasPorMes[monthYear] || 0) + 1;
    });

    return res.status(200).json({
      citasPorMes,
      citasPorEstado,
      totalCitas,
    });
  } catch (error) {
    console.error('Error en la API:', error);
    return res.status(500).json({ message: 'Error al obtener las estadísticas' });
  }
};

export default getDashboardStatistics;