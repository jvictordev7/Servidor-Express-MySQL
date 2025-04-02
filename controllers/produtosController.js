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
        const { nome, descricao, preco } = req.body; // Dados já validados pelo middleware
        const novoProduto = await produtosService.createProduto({ nome, descricao, preco });
        res.status(201).json(novoProduto);
    } catch (error) {
        next(error);
    }
}

async function atualizarProduto(req, res, next) {
    try {
        const { nome, descricao, preco } = req.body;
        const produtoAtualizado = await produtosService.updateProduto(req.params.id, { nome, descricao, preco });
        if (!produtoAtualizado) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto atualizado com sucesso' }); // Corrigido
    } catch (error) {
        next(error);
    }
}


async function excluirProduto(req, res, next) {
    try {
        console.log('Tentando excluir produto com ID:', req.params.id);
        const produto = await produtosService.getProdutoById(req.params.id);
        if (!produto) {
            console.log('Produto não encontrado:', req.params.id);
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        await produtosService.deleteProduto(req.params.id);
        console.log('Produto deletado com sucesso:', req.params.id);
        res.status(200).json({ message: 'Produto deletado com sucesso' });
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