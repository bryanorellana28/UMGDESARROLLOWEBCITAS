import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const assignAppointmentHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, nombre, fecha, hora, descripcion, estado } = req.body;

    try {
      // Crear la cita en la base de datos
      const appointment = await prisma.cita.create({
        data: {
          email,
          nombre,  // Guardamos el nombre en la base de datos
          fecha: new Date(fecha),  // Convertimos la fecha al formato adecuado
          hora,
          descripcion,
          estado,
          doctorAsignado: 'Pendiente de asignar',  // Valor predeterminado
        },
      });

      return res.status(201).json(appointment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al asignar la cita' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default assignAppointmentHandler;