const express = require('express');
const produtosController = require('../controllers/produtosController');
const validarProduto = require('../middlewares/validarProduto');

const router = express.Router();

router.get('/', produtosController.listarProdutos);
router.get('/:id', produtosController.obterProduto);
router.post('/', validarProduto, produtosController.criarProduto); // Middleware aplicado aqui
router.put('/:id', validarProduto, produtosController.atualizarProduto); // Middleware aplicado aqui
router.delete('/:id', produtosController.excluirProduto);

module.exports = router;