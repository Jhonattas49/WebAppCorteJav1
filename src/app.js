/**
 * @filename app.js 
 * @class app
 * @namespace 'src/' 
 * @description **Ponto de entrada principal**
 * O arquivo app.js é o ponto de entrada principal da sua aplicação Express. 
 * Ele configura o servidor, estabelece a conexão com o banco de dados MongoDB, 
 * carrega os models e rotas da aplicação, e define middlewares para tratar requisições, 
 * respostas e erros.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [25/06/2024]
 */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');

const app = express();
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

//Carregando os modelss
require('./domain/models/loadModels');
//Carregar as rotas
const routes= require('./domain/routes/_index');

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

app.use(bodyParser.urlencoded({extended:false}));

//Inject route no app
app.use('/customers', routes.CustomerRoute);
app.use('/bot', routes.VenomBotRoute);

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: err.message,
    error: err
  });
});
//start em app
module.exports = app;