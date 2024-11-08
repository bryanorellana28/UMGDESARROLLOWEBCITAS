// pages/api/available-hours.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define el tipo para las horas reservadas
type ReservedHour = {
  hora: string; // Cambia esto si el tipo de 'hora' es diferente
};

const availableHoursHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { date } = req.body;

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    try {
      // Asegúrate de especificar el tipo esperado
      const reservedHours = await prisma.$queryRaw<ReservedHour[]>`
        SELECT hora FROM Calendario WHERE fecha >= ${startOfDay} AND fecha <= ${endOfDay}
      `;

      const allHours = Array.from({ length: 10 }, (_, i) => (i + 8).toString());
      const reservedHoursSet = new Set(reservedHours.map((item) => item.hora));

      const availableHours = allHours.filter(hour => !reservedHoursSet.has(hour));

      return res.status(200).json(availableHours);
    } catch (error) {
      console.error(error); // Log para ver el error
      return res.status(500).json({ message: 'Error al obtener horas disponibles' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default availableHoursHandler;