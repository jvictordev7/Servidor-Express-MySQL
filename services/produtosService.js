const pool = require('../configs/database');

function validateProduto(produto) {
    const { nome, descricao, preco } = produto;

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        throw new Error('Nome é obrigatório e deve ser uma string não vazia.');
    }

    if (!descricao || typeof descricao !== 'string' || descricao.length > 255) {
        throw new Error('Descrição é obrigatória e deve ter no máximo 255 caracteres.');
    }

    if (typeof preco !== 'number' || preco <= 0) {
        throw new Error('Preço deve ser um número positivo.');
    }
}

async function getAllProdutos() {
    const [rows] = await pool.query('SELECT * FROM produtos');
    return rows;
}

async function getProdutoById(id) {
    const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows[0];
}

async function createProduto(produto) {
    validateProduto(produto); // Validate before inserting
    const { nome, descricao, preco } = produto;
    const [result] = await pool.query(
        'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)',
        [nome, descricao, preco]
    );
    return getProdutoById(result.insertId);
}

async function updateProduto(id, produto) {
    validateProduto(produto); // Validate before updating
    const { nome, descricao, preco } = produto;
    await pool.query(
        'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
        [nome, descricao, preco, id]
    );
    return getProdutoById(id);
}

async function deleteProduto(id) {
    const [result] = await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
    return result.affectedRows > 0; // Retorna true se algo foi deletado
}

module.exports = {
    getAllProdutos,
    getProdutoById,
    createProduto,
    updateProduto,
    deleteProduto
};