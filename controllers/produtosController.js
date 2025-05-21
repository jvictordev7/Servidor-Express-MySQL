const produtosService = require('../services/produtosService');
const cache = require('../configs/cache');

// Listar produtos com cache e logs
async function listarProdutos(req, res, next) {
    const cachedData = cache.get("produtos");
    if (cachedData) {
        console.log("\x1b[36m[✔ CACHE]\x1b[0m Dados de produtos do cache");
        return res.status(200).json(cachedData);
    }
    try {
        const produtos = await produtosService.getAllProdutos();
        cache.set("produtos", produtos);
        console.log("\x1b[33m[✔ DB]\x1b[0m Dados de produtos do banco");
        return res.status(200).json(produtos);
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
        cache.del("produtos"); // Invalida o cache
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
        cache.del("produtos"); // Invalida o cache
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
        cache.del("produtos"); // Invalida o cache
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