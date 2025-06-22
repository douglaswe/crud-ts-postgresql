import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { TokenPayload } from '../middlewares/auth';

const prisma = new PrismaClient();

export async function criarLivro(req: Request, res: Response) {
  const { titulo, autor } = req.body;
  const user = (req as any).user as TokenPayload;

  const livro = await prisma.livro.create({
    data: { titulo, autor, criadoPor: user.username }
  });

  res.status(201).json(livro);
}

export async function listarLivros(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const livros = await prisma.livro.findMany({
    skip,
    take: limit,
    orderBy: { criadoEm: 'desc' }
  });

  const total = await prisma.livro.count();

  res.json({ page, totalPages: Math.ceil(total / limit), data: livros });
}

export async function atualizarLivro(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id);
  const { titulo, autor } = req.body;
  const user = (req as any).user as TokenPayload;

  const livro = await prisma.livro.findUnique({ where: { id } });
  if (!livro) {
    res.status(404).json({ message: 'Livro não encontrado' });
    return;
  }

  if (livro.criadoPor !== user.username && user.tipo !== '0') {
    res.status(403).json({ message: 'Sem permissão para editar' });
    return;
  }

  const atualizado = await prisma.livro.update({ where: { id }, data: { titulo, autor } });
  res.json(atualizado);
}

export async function deletarLivro(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id);
  const user = (req as any).user as TokenPayload;

  const livro = await prisma.livro.findUnique({ where: { id } });
  if (!livro) {
    res.status(404).json({ message: 'Livro não encontrado' });
    return;
  }

  if (livro.criadoPor !== user.username && user.tipo !== '0') {
    res.status(403).json({ message: 'Sem permissão para excluir' });
    return;
  }

  await prisma.livro.delete({ where: { id } });
  res.json({ message: 'Livro excluído com sucesso' });
}