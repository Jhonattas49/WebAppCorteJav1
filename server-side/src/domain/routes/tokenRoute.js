/**
 * @filename tokenRoute.js
 * @class TokenRoute
 * @namespace 'src/domain/routes'
 * @description **Rotas para gerenciamento de administradores.**
 * Este arquivo define rotas para interagir com a API de administradores. 
 * Ele utiliza o AdminController para lidar com as solicitações e o AdminController 
 * para validar os dados de entrada.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [15/07/2024]
 */
'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/TokenController');
const autheService = require('../services/AuthServices').authorize;

//router.get('/',  middlewaresIndex.CreateSupUser, controller.get);
router.get('/', controller.get);
router.post('/', controller.post);





module.exports = router;