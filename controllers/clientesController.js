const clientesService = require('../services/clientesService');

async function listarClientes(req, res, next) {
    try {
        const clientes = await clientesService.getAllClientes();
        res.json(clientes);
    } catch (error) {
        next(error);
    }
}

async function obterCliente(req, res, next) {
    try {
        const cliente = await clientesService.getClienteById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        next(error);
    }
}

async function criarCliente(req, res, next) {
    try {
        const novoCliente = await clientesService.createCliente(req.body);
        res.status(201).json(novoCliente);
    } catch (error) {
        next(error);
    }
}

async function atualizarCliente(req, res, next) {
    try {
        const clienteAtualizado = await clientesService.updateCliente(req.params.id, req.body);
        res.json(clienteAtualizado);
    } catch (error) {
        next(error);
    }
}

async function excluirCliente(req, res, next) {
    try {
        await clientesService.deleteCliente(req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listarClientes,
    obterCliente,
    criarCliente,
    atualizarCliente,
    excluirCliente
};