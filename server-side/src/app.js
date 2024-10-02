'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan'); 
const cors= require('cors');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Verificar se o arquivo .env no server-side existe
const serverSideEnvPath = path.resolve(__dirname, '../.env');

if (fs.existsSync(serverSideEnvPath)) {
  require('dotenv').config({ path: serverSideEnvPath });
} else {
  require('dotenv').config();
}

const dbUri = process.env.MONGODB_URI;
//const connectionString = process.env.MONGODB_URI;

if (!dbUri) {
  console.error("MongoDB URI is not defined in environment variables");
  process.exit(1);
}

// Função assíncrona para conectar-se ao MongoDB usando Mongoose
const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbUri);
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

app.use('/login', routes.loginRoute);
app.use('/record', routes.recordRoute);
app.use('/generate-token', routes.tokenRoute);
app.use('/bot', routes.venomBotRoute);
app.use('/customers', routes.customerRoute);
app.use('/roles', routes.roleRoute);
app.use('/permissions', routes.permissionRoute);
app.use('/user', routes.userRoute);
// Rota de login com encaminhamento para geração de token
//app.post('/login', routes.authController.login, tokenController.post);


//start em app
module.exports = app;
