function validarProduto(req, res, next) {
    const { nome, preco, categoria } = req.body;
    
    if (!nome || !preco || !categoria) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    
    if (typeof preco !== 'number' || preco <= 0) {
        return res.status(400).json({ message: 'Preço deve ser um número positivo' });
    }
    
    next();
}

module.exports = validarProduto;
