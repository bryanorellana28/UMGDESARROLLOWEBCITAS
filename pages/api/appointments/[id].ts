// pages/api/appointments/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const appointmentHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  // Validar ID de cita
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid appointment ID' });
  }

  switch (req.method) {
    case 'DELETE':
      try {
        const deletedAppointment = await prisma.cita.delete({
          where: { id: Number(id) },
        });
        return res.status(200).json(deletedAppointment);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al cancelar la cita' });
      }

    case 'PUT':
      const { estado, doctorAsignado, resolucion } = req.body;

      // Validar datos entrantes
      if (!estado) {
        return res.status(400).json({ message: 'Estado es requerido' });
      }

      const updateData: any = { estado };
      if (doctorAsignado) {
        updateData.doctorAsignado = doctorAsignado;
      }
      if (resolucion) {
        updateData.revision = resolucion;
      }

      try {
        const updatedAppointment = await prisma.cita.update({
          where: { id: Number(id) },
          data: updateData,
        });
        return res.status(200).json(updatedAppointment);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al modificar la cita' });
      }

    default:
      res.setHeader('Allow', ['DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default appointmentHandler;