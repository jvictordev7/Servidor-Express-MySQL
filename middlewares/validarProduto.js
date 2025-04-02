function validarProduto(req, res, next) {
    const { nome, descricao, preco } = req.body;
    
    if (!nome || !descricao || !preco) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    
    if (typeof preco !== 'number' || preco <= 0) {
        return res.status(400).json({ message: 'Preço deve ser um número positivo' });
    }
    
    next();
}

module.exports = validarProduto;
