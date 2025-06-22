import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const senhaHash = await bcrypt.hash('admin123', 10);

  await prisma.usuario.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      nome: 'Administrador do Sistema',
      password: senhaHash,
      tipo: '0',
      status: 'A',
      quantAcesso: 0,
    },
  });

  console.log('Usuário admin criado!');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
