const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');
const validarProduto = require('../middlewares/validarProduto');

router.get('/', produtosController.listarProdutos);
router.get('/:id', produtosController.obterProduto);
router.post('/', validarProduto, produtosController.criarProduto);
router.put('/:id', validarProduto, produtosController.atualizarProduto);
router.delete('/:id', produtosController.excluirProduto);

module.exports = router;