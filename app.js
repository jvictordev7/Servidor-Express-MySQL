require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const path = require('path');
const cors = require('cors'); // Importa o CORS
const { swaggerUi, swaggerSpec } = require('./swagger'); // Importa o Swagger

const indexRouter = require('./routes');
const clientesRouter = require('./routes/clientesRoutes');
const produtosRouter = require('./routes/produtosRoutes');

const app = express();

// Middleware para habilitar o CORS
app.use(cors({
  origin: 'http://localhost:3000', // Permite apenas o frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true, // Permite envio de cookies, se necessário
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use('/', indexRouter);
app.use('/clientes', clientesRouter);
app.use('/produtos', produtosRouter);

// Tratamento de erros 404
app.use((req, res, next) => {
  next(createError(404));
});

// Tratamento de erros gerais
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
      stack: req.app.get('env') === 'development' ? err.stack : undefined,
    },
  });
});

module.exports = app; // Exporta apenas o app, sem iniciar o servidor