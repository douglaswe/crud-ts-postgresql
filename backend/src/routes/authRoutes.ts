import { Router } from 'express';
import {
  login,
  registrar,
  alterarSenha,
  solicitarRecuperacao,
  redefinirSenha
} from '../controllers/authController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Autenticação
 *     description: Gerenciamento de usuários e autenticação
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 *       403:
 *         description: Usuário bloqueado
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastra um novo usuário (apenas para administradores)
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - nome
 *               - tipo
 *             properties:
 *               username:
 *                 type: string
 *                 example: joao
 *               password:
 *                 type: string
 *                 example: senha123
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               tipo:
 *                 type: string
 *                 enum: [0, 1]
 *                 example: 1
 *                 description: "0 = Administrador, 1 = Usuário Comum"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       403:
 *         description: Acesso negado (somente administradores)
 */
router.post('/register', authenticateToken, registrar);

/**
 * @swagger
 * /auth/alterar-senha:
 *   patch:
 *     summary: Altera a senha do usuário autenticado
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senhaAtual
 *               - novaSenha
 *             properties:
 *               senhaAtual:
 *                 type: string
 *                 example: antiga123
 *               novaSenha:
 *                 type: string
 *                 example: nova123
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso
 *       403:
 *         description: Senha atual incorreta
 */
router.patch('/alterar-senha', authenticateToken, alterarSenha);

/**
 * @swagger
 * /auth/solicitar-recuperacao:
 *   post:
 *     summary: Solicita recuperação de senha (simulado)
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 example: joao
 *     responses:
 *       200:
 *         description: Link de recuperação gerado (simulado no console)
 *       404:
 *         description: Usuário não encontrado
 */
router.post('/solicitar-recuperacao', solicitarRecuperacao);

/**
 * @swagger
 * /auth/redefinir-senha:
 *   post:
 *     summary: Redefine a senha usando um token temporário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - novaSenha
 *             properties:
 *               token:
 *                 type: string
 *                 example: seu.token.jwt.aqui
 *               novaSenha:
 *                 type: string
 *                 example: novaSenha456
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Token inválido ou expirado
 */
router.post('/redefinir-senha', redefinirSenha);

export default router;
