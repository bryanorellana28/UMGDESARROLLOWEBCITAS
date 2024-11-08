// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Buscar al usuario por email en la base de datos
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar el token JWT con el nombre del usuario incluido en el payload
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, nombre: user.nombre },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1h', 
      }
    );

    return res.status(200).json({ token });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default loginHandler;
