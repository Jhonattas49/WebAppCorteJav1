/**
 * @filename RoleController.js
 * @class RoleController
 * @namespace 'src/domain/routes'
 * @description **Rotas para gerenciamento de administradores.**
 * Este arquivo define rotas para interagir com a API de administradores. 
 * Ele utiliza o AdminController para lidar com as solicitações e o AdminController 
 * para validar os dados de entrada.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [05/08/2024]
 */
'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/RoleController');
const validator = require('../../shared/validators/CustomerValidator');
const autheService = require('../services/AuthServices');


router.get('/', controller.get);
router.post('/', controller.post);
router.put('/', controller.put);
router.delete('/', controller.delete);


module.exports = router;