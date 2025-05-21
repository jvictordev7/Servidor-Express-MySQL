// routes/index.js

const express = require('express');
const router = express.Router();

// Rota base da API - verifica se a API está online
router.get('/', (req, res) => {
    console.log('\x1b[32m[✔ ONLINE]\x1b[0m API está rodando!');
    res.status(200).json({ message: 'API funcionando!' });
});

module.exports = router;
