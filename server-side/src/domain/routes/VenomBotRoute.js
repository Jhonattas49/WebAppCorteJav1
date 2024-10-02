/**
 * @filename VenomBotRoute.js 
 * @class VenomBotRoute
 * @namespace 'src/routes/venomBot' 
 * @description **Rotas para gerenciamento do bot Venom.**
 * Este arquivo define rotas para interagir com o bot Venom. 
 * Ele utiliza o `VenomBotController` para lidar com as solicitações.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [27/06/2024]
 */
'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/VenomBotController');
const validator = require('../../shared/validators/CustomerValidator');
const autheService = require('../services/AuthServices');

router.get('/', controller.get);
router.post('/', autheService.authorize, controller.post);

module.exports = router;