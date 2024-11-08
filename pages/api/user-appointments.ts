// pages/api/user-appointments.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const userAppointmentsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del header
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT secret is not defined');
      }

      const decoded: any = jwt.verify(token, secret); // Decodificar el token
      const email = decoded.email; // Obtener el correo del payload del JWT

      // Usar Prisma para obtener las citas para el médico o el paciente
      const appointments = await prisma.cita.findMany({
        where: {
          OR: [
            // Para el médico (doctorAsignado)
            { estado: 'asignado', doctorAsignado: email },
            { estado: 'finalizado', doctorAsignado: email },
            // Para el paciente (email)
            { estado: 'pendiente', email: email },
            { estado: 'asignado', email: email },
            { estado: 'finalizado', email: email },
          ],
        },
      });

      return res.status(200).json(appointments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al obtener las citas' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default userAppointmentsHandler;