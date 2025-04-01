function validarCliente(req, res, next) {
    const { nome, sobrenome, email, idade } = req.body;
    
    if (!nome || !sobrenome || !email || !idade) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    
    if (typeof idade !== 'number' || idade < 0) {
        return res.status(400).json({ message: 'Idade deve ser um número positivo' });
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Email inválido' });
    }
    
    next();
}

module.exports = validarCliente;