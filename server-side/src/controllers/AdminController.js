/**
 * @filename AdminController.js
 * @class AdminController
 * @namespace 'src/controllers'
 * @description **Controlador para gerenciamento de administradores.**
 * Esta classe define rotas para gerenciar administradores na aplicação. 
 * Ela utiliza o repositório `AdminRepository` para acessar dados de administradores 
 * e valida entradas de usuário com o `express-validator`.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [28/06/2024]
 */
'use strict';

const repository = require('../domain/repositories/AdminRepository');
const { validationResult } = require('express-validator');

exports.get = async (req, res, next) => {
    try {
        console.log('Pagina index carregada.')
        res.status(200).send(res);
    } catch (e) {
        res.status(500).send({
            result: e,
            message: 'Falha ao processar sua requisição!'
        });
    }
}

