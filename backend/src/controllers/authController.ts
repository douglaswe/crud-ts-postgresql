import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../middlewares/auth';

const prisma = new PrismaClient();


export async function registrar(req: Request, res: Response): Promise<void> {
  const { username, password, nome, tipo } = req.body;

  // Apenas administradores podem criar novos usuários
  const solicitante = (req as any).user as TokenPayload;
  if (solicitante.tipo !== '0') {
    res.status(403).json({ message: 'Apenas administradores podem criar novos usuários' });
    return;
  }

  const existe = await prisma.usuario.findUnique({ where: { username } });
  if (existe) {
    res.status(400).json({ message: 'Usuário já existe' });
    return;
  }

  const hash = await bcrypt.hash(password, 10);

  await prisma.usuario.create({
    data: {
      username,
      password: hash,
      nome,
      tipo,
      status: 'A',
      quantAcesso: 0,
      tentativasErradas: 0
    }
  });

  res.status(201).json({ message: 'Usuário criado com sucesso' });
}



export async function login(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;

  const usuario = await prisma.usuario.findUnique({ where: { username } });
  if (!usuario) {
    res.status(404).json({ message: 'Usuário não encontrado' });
    return;
  }

  if (usuario.status === 'B') {
    console.warn(`Usuário ${username} bloqueado por 3 tentativas inválidas.`);
    res.status(403).json({ message: 'Usuário bloqueado' });
    return;
  }

  const senhaCorreta = await bcrypt.compare(password, usuario.password);

  if (!senhaCorreta) {
    const tentativas = usuario.tentativasErradas + 1;
    const status = tentativas >= 3 ? 'B' : usuario.status;
    await prisma.usuario.update({ where: { username }, data: { tentativasErradas: tentativas, status } });
    res.status(403).json({ message: 'Senha incorreta' });
    return;
  }

  await prisma.usuario.update({
    where: { username },
    data: {
      quantAcesso: { increment: 1 },
      tentativasErradas: 0
    }
  });

  const usuarioAtualizado = await prisma.usuario.findUnique({ where: { username } });

  const token = jwt.sign(
    { username: usuarioAtualizado!.username, tipo: usuarioAtualizado!.tipo },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  res.json({
    token,
    user: {
      username: usuarioAtualizado!.username,
      tipo: usuarioAtualizado!.tipo,
      nome: usuarioAtualizado!.nome,
      quantAcesso: usuarioAtualizado!.quantAcesso
    }
  })
}

export async function alterarSenha(req: Request, res: Response): Promise<void> {
  const user = (req as any).user as TokenPayload;
  const { senhaAtual, novaSenha } = req.body;

  const usuario = await prisma.usuario.findUnique({ where: { username: user.username } });
  if (!usuario) {
    res.status(404).json({ message: 'Usuário não encontrado' });
    return;
  }

  const senhaCorreta = await bcrypt.compare(senhaAtual, usuario.password);
  if (!senhaCorreta) {
    res.status(403).json({ message: 'Senha atual incorreta' });
    return;
  }

  const novaHash = await bcrypt.hash(novaSenha, 10);

  await prisma.usuario.update({ where: { username: user.username }, data: { password: novaHash } });

  res.json({ message: 'Senha alterada com sucesso' });
}


export async function solicitarRecuperacao(req: Request, res: Response): Promise<void> {
  const { username } = req.body;

  const usuario = await prisma.usuario.findUnique({ where: { username } });

  if (!usuario) {
    res.status(404).json({ message: 'Usuário não encontrado' });
    return;
  }

  const token = jwt.sign(
    { username: usuario.username },
    process.env.JWT_SECRET!,
    { expiresIn: '15m' }
  );

  const urlRecuperacao = `http://localhost:5173/redefinir-senha?token=${token}`;

  res.json({
    message: 'Link de recuperação gerado.',
    link: urlRecuperacao
  });
}

export async function redefinirSenha(req: Request, res: Response): Promise<void> {
  const { token, novaSenha } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    const novaHash = await bcrypt.hash(novaSenha, 10);

    await prisma.usuario.update({
      where: { username: decoded.username },
      data: { password: novaHash, tentativasErradas: 0, status: 'A' }
    });

    res.json({ message: 'Senha redefinida com sucesso' });
  } catch {
    res.status(400).json({ message: 'Token inválido ou expirado' });
  }
}
