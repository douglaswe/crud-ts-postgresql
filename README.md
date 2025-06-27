## 💻 Acesse o Projeto Online

Você pode visualizar o projeto em funcionamento através do seguinte link:

🔗 [https://crud-ts-postgresql.vercel.app/](https://crud-ts-postgresql.vercel.app/)

> ⚠️ **Atenção:** no primeiro acesso, especialmente ao realizar o login, o carregamento pode levar alguns segundos.  
> Isso acontece porque o backend está em modo de hibernação e pode demorar um pouco para ser reativado.

# Sistema de Autenticação e Gerenciamento de Acessos

Este projeto é um sistema web para gerenciamento de livros, com controle de acesso baseado em autenticação de usuários.

## 🔐 Funcionalidades

### 1. Autenticação de Usuário
- Cadastro de novos usuários (restrito a usuários com perfil de `Administrador`).
- Armazenamento de login e senha de forma criptografada.
- Login com verificação de credenciais.
- Geração de token de sessão (JWT) para acesso autenticado.
- Logout com invalidação de sessão.

### 2. Controle de Acesso
- Contagem de acessos do usuário (`Quant_Acesso`) atualizada a cada login bem-sucedido.
- Bloqueio do usuário após 3 tentativas consecutivas de login com senha incorreta:
  - O campo `Status` do usuário é alterado para `"B"` (bloqueado).
- Todos os usuários são criados com `Status = "A"` (ativo) por padrão.

### 3. Manutenção de Senhas
- Alteração de senha pelo próprio usuário autenticado.
- Recuperação de senha por meio de um fluxo simulado de envio de e-mail (sem envio real de mensagens), disponível para usuários não autenticados.

### 4. Operações CRUD 
Após autenticação, usuários podem realizar as seguintes ações com livros:
- Criar um novo livro.
- Listar todos os livros com suporte à paginação.
- Editar os dados de livros existentes.
- Excluir livros do sistema.

## 🛠️ Tecnologias Utilizadas
- Linguagem: TypeScript
- Framework Backend:  Express.js
- Framework de Estilização: Tailwind CSS
- Autenticação: JWT (JSON Web Tokens)
- Banco de Dados: PostgreSQL
- Criptografia: bcrypt

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/crud-ts-postgresql.git
```

### 2. Instale as dependências do frontend

```bash
cd frontend
npm install
```

### 3. Instale as dependências do backend

```bash
cd backend
npm install
```
### 4. Configure o banco de dados e as variáveis de ambiente

Crie um banco PostgreSQL localmente ou utilize um serviço como o Neon ou similar.

Em seguida, crie um arquivo `.env` na pasta `backend` do projeto com o seguinte conteúdo:

```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta_aqui"
```

E um arquivo `.env` na pasta `frontend` com:

```bash
VITE_API_URL=http://localhost:5173
```

### 5. Execute as migrações e inicie o servidor

#### Rodar o backend:

```bash
cd backend
npx prisma migrate dev --name init
npm run seed
npm run dev
```
#### Rodar o frontend:

```bash
cd frontend
npm run dev
```

### 6. Testar a API
Com o servidor backend em execução, acesse a documentação interativa da API (Swagger) no seguinte endereço:

```bash
http://localhost:3000/api-docs
```

Essa interface permite visualizar todos os endpoints disponíveis, entender quais parâmetros são esperados em cada rota e testar requisições diretamente pelo navegador — sem a necessidade de ferramentas como Postman ou Insomnia.
