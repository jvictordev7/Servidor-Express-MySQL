const request = require('supertest');
const app = require('../app'); // Importa o app diretamente
const database = require('../configs/database'); // Certifique-se de que o caminho está correto

afterAll(async () => {
    await database.end(); // Fecha a conexão com o banco de dados
});

let produtoId;

describe('Testes para a rota /produtos', () => {
    it('Deve criar um novo produto', async () => {
        const res = await request(app).post('/produtos').send({
            nome: 'Notebook',
            descricao: 'Notebook gamer',
            preco: 4500.00
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        produtoId = res.body.id;
    });

    it('Deve listar todos os produtos', async () => {
        const res = await request(app).get('/produtos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('Deve atualizar um produto', async () => {
        const res = await request(app).put(`/produtos/${produtoId}`).send({
            nome: 'Notebook Atualizado',
            descricao: 'Notebook gamer atualizado',
            preco: 4800.00
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Produto atualizado com sucesso');
    });

    it('Deve deletar um produto', async () => {
        const res = await request(app).delete(`/produtos/${produtoId}`);
        console.log('Resposta ao tentar deletar produto:', res.body);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Produto deletado com sucesso');
    });
});