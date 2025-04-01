const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const validarCliente = require('../middlewares/validarCliente');

router.get('/', clientesController.listarClientes);
router.get('/:id', clientesController.obterCliente);
router.post('/', validarCliente, clientesController.criarCliente);
router.put('/:id', validarCliente, clientesController.atualizarCliente);
router.delete('/:id', clientesController.excluirCliente);

module.exports = router;