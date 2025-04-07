const express = require('express');
const produtosController = require('../controllers/produtosController');
const validarProduto = require('../middlewares/validarProduto');

const router = express.Router();

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Retorna a lista de produtos
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */
router.get('/', produtosController.listarProdutos);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Retorna um produto específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto retornado com sucesso
 */
router.get('/:id', produtosController.obterProduto);

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */
router.post('/', validarProduto, produtosController.criarProduto); // Middleware aplicado aqui

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 */
router.put('/:id', validarProduto, produtosController.atualizarProduto); // Middleware aplicado aqui

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Exclui um produto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso
 */
router.delete('/:id', produtosController.excluirProduto);

module.exports = router;