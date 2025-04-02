const app = require('./app'); // Importa o app configurado no app.js

const PORT = process.env.PORT || 3000; // Define a porta a partir do .env ou usa 3000 como padrão

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});