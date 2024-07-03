'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const morgan = require('morgan');  // Adicione o morgan aqui
const cors= require('cors');
const router = express.Router();

//Carrega os arquivos sensíveis
require('dotenv').config();

const connectionString = process.env.MONGODB_URI;

// Função assíncrona para conectar-se ao MongoDB usando Mongoose
const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionString);
    //console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Encerra o aplicativo em caso de erro crítico
  }
};

// Validar a conexão com o banco
connectToDatabase();
const app = express();
app.use(cors());

//Carregando os models
require('./shared/models/_index');
//Carregar as rotas
const routes = require('./domain/routes/_index');

// Adicione o morgan como middleware
app.use(morgan('dev'));  // Usando o formato 'dev' para desenvolvimento

//Carrega e define o tamanho do json
app.use(bodyParser.json({
    limit: '5mb'
}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes.indexRoute);
//app.use('/customers', routes.CustomerRoute);

//start em app
module.exports = app;
