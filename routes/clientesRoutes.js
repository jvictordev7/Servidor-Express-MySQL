const express = require('express');
const clientesController = require('../controllers/clientesController'); // Controle de clientes
const validarCliente = require('../middlewares/validarCliente'); // Validação de cliente
const limitarAcao = require('../middlewares/limiteAcoes'); // Limitar ações

const router = express.Router();

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Retorna a lista de clientes
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 */
router.get('/', clientesController.listarClientes);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Retorna um cliente específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente retornado com sucesso
 */
router.get('/:id', clientesController.obterCliente);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               sobrenome:
 *                 type: string
 *               email:
 *                 type: string
 *               idade:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 */
router.post('/', limitarAcao('adicionar'), validarCliente, clientesController.criarCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente
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
 *               sobrenome:
 *                 type: string
 *               email:
 *                 type: string
 *               idade:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 */
router.put('/:id', limitarAcao('editar'), validarCliente, clientesController.atualizarCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Exclui um cliente existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente excluído com sucesso
 */
router.delete('/:id', limitarAcao('excluir'), clientesController.excluirCliente);

module.exports = router;
