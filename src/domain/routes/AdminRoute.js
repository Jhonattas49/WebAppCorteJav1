/**
 * @filename AdminRoute.js
 * @class AdminRoute
 * @namespace 'src/domain/routes'
 * @description **Rotas para gerenciamento de administradores.**
 * Este arquivo define rotas para interagir com a API de administradores. 
 * Ele utiliza o AdminController para lidar com as solicitações e o AdminController 
 * para validar os dados de entrada.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [27/06/2024]
 */
'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/CustomerController');
const validator = require('../../shared/validators/CustomerValidator');

router.get('/',controller.get);


module.exports = router;