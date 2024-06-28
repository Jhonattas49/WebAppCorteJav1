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

router.get('/',controller.get);
router.get('/start',controller.StartBot);
router.put('/');
router.delete('/');

module.exports = router;