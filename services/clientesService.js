const pool = require('../configs/database');

async function getAllClientes() {
    const [rows] = await pool.query('SELECT * FROM clientes');
    return rows;
}

async function getClienteById(id) {
    const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
    return rows[0];
}

async function createCliente(cliente) {
    try {
        const { nome, sobrenome, email, idade } = cliente;

        if (!nome || !sobrenome || !email || idade === undefined) {
            throw new Error('Todos os campos (nome, sobrenome, email, idade) são obrigatórios.');
        }

        const [result] = await pool.query(
            'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
            [nome, sobrenome, email, idade]
        );

        return await getClienteById(result.insertId);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error('O email fornecido já está em uso. Por favor, use outro email.');
        }
        console.error('Erro ao criar cliente:', error.message);
        throw error;
    }
}

async function updateCliente(id, cliente) {
    try {
        const { nome, sobrenome, email, idade } = cliente;

        if (!nome || !sobrenome || !email || idade === undefined) {
            throw new Error('Todos os campos (nome, sobrenome, email, idade) são obrigatórios.');
        }

        const [result] = await pool.query(
            'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
            [nome, sobrenome, email, idade, id] // Corrigido para garantir que os valores estão na ordem correta
        );

        if (result.affectedRows === 0) {
            throw new Error(`Cliente com ID ${id} não encontrado.`);
        }

        return await getClienteById(id);
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error.message);
        throw error;
    }
}

async function deleteCliente(id) {
    const [result] = await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
    return result.affectedRows > 0; // Retorna true se algo foi deletado
}

module.exports = {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
};