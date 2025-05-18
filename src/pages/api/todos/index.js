import { PrismaClient } from '@prisma/client';

import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(todos);
  } else if (req.method === 'POST') {
    const { title } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Título obrigatório' });
    }
    const todo = await prisma.todo.create({ data: { title } });
    res.status(201).json(todo);
  } else {
    res.status(405).end();
  }
}
