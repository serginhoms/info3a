import { PrismaClient } from '@prisma/client';

import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const id = parseInt(req.query.id);

  if (req.method === 'DELETE') {
    try {
      await prisma.todo.delete({ where: { id } });
      res.status(204).end();
    } catch (error) {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } else {
    res.status(405).end();
  }
}
