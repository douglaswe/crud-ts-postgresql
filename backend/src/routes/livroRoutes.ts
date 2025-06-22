import { Router } from 'express';
import {
  criarLivro,
  listarLivros,
  atualizarLivro,
  deletarLivro
} from '../controllers/livroController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: Operações de CRUD para a entidade Livro
 */

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Criar um novo livro
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - autor
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.post('/', criarLivro);

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Listar todos os livros com paginação
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Número da página
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso
 */
router.get('/', listarLivros);

/**
 * @swagger
 * /livros/{id}:
 *   put:
 *     summary: Atualizar um livro
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do livro a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       403:
 *         description: Sem permissão para atualizar o livro
 *       404:
 *         description: Livro não encontrado
 */
router.put('/:id', atualizarLivro);

/**
 * @swagger
 * /livros/{id}:
 *   delete:
 *     summary: Deletar um livro
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do livro a ser deletado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Livro excluído com sucesso
 *       403:
 *         description: Sem permissão para deletar o livro
 *       404:
 *         description: Livro não encontrado
 */
router.delete('/:id', deletarLivro);

export default router;
