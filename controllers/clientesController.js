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
        if (!clienteAtualizado) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.json({ message: 'Cliente atualizado com sucesso' });
    } catch (error) {
        next(error);
    }
}

async function excluirCliente(req, res, next) {
    try {
        console.log('Tentando excluir cliente com ID:', req.params.id);
        const cliente = await clientesService.getClienteById(req.params.id);
        if (!cliente) {
            console.log('Cliente não encontrado:', req.params.id);
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        await clientesService.deleteCliente(req.params.id);
        console.log('Cliente deletado com sucesso:', req.params.id);
        res.status(200).json({ message: 'Cliente deletado com sucesso' });
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
