const produtosService = require('../services/produtosService');

async function listarProdutos(req, res, next) {
    try {
        const produtos = await produtosService.getAllProdutos();
        res.json(produtos);
    } catch (error) {
        next(error);
    }
}

async function obterProduto(req, res, next) {
    try {
        const produto = await produtosService.getProdutoById(req.params.id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(produto);
    } catch (error) {
        next(error);
    }
}

async function criarProduto(req, res, next) {
    try {
        produtosService.validateProduto(req.body); // Validação antes de criar
        const novoProduto = await produtosService.createProduto(req.body);
        res.status(201).json(novoProduto);
    } catch (error) {
        next(error);
    }
}

async function atualizarProduto(req, res, next) {
    try {
        produtosService.validateProduto(req.body); // Validação antes de atualizar
        const produtoAtualizado = await produtosService.updateProduto(req.params.id, req.body);
        res.json(produtoAtualizado);
    } catch (error) {
        next(error);
    }
}

async function excluirProduto(req, res, next) {
    try {
        await produtosService.deleteProduto(req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listarProdutos,
    obterProduto,
    criarProduto,
    atualizarProduto,
    excluirProduto
};