'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');


const app = express();
const router = express.Router();


require('dotenv').config();

const connectionString = process.env.MONGODB_URI;

// Função assíncrona para conectar-se ao MongoDB usando Mongoose
const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Encerra o aplicativo em caso de erro crítico
  }
};

// Conectar ao MongoDB
connectToDatabase();

//Carregando os modelss


//Carregar as rotas


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

//start em app
// Exemplo de rota
app.get('/', (req, res) => {
  res.send('Sobre tudo o que se deve guardar, guarda o seu coração...');
});

module.exports = app;