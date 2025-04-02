const request = require('supertest');
const app = require('../app'); // Importa o app diretamente
const database = require('../configs/database'); // Certifique-se de que o caminho está correto

afterAll(async () => {
    await database.end(); // Fecha a conexão com o banco de dados
});

let clienteId;

describe('Testes para a rota /clientes', () => {
    it('Deve criar um novo cliente', async () => {
        const res = await request(app).post('/clientes').send({
            nome: 'Teste',
            sobrenome: 'User',
            email: `teste${Date.now()}@email.com`,
            idade: 30
        });

        console.log('Cliente criado com ID:', res.body.id);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        clienteId = res.body.id;
    });

    it('Deve listar todos os clientes', async () => {
        const res = await request(app).get('/clientes');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('Deve atualizar um cliente', async () => {
        const res = await request(app).put(`/clientes/${clienteId}`).send({
            nome: 'Atualizado',
            sobrenome: 'User',
            email: `atualizado${Date.now()}@email.com`,
            idade: 35
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Cliente atualizado com sucesso');
    });

    it('Deve deletar um cliente', async () => {
        const res = await request(app).delete(`/clientes/${clienteId}`);
        console.log('Resposta ao tentar deletar cliente:', res.body);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Cliente deletado com sucesso');
    });
});