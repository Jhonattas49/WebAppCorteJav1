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
const tokenServices = require('../domain/services/AuthServices');

exports.get = async (req, res, next) => {
    try {
        res.status(200).send('Seja bem-vindo');
    } catch (e) {
        res.status(500).send({
            result: e,
            message: 'Falha ao processar sua requisição!'
        });
    }
};

exports.login = async (req, res, next) => {
    console.log('Controller admin')
    try {
        const result = await repository.authenticate({
            email: req.body.email,
            password: req.body.password
        });

        if (!result.success) {
            res.status(401).send(result);
            return;
        }
        
        req.body.user = result;
        next(); // Encaminha a requisição para a próxima função de middleware
        // const token = await tokenServices.generateToken(record);

        // res.status(200).send({
        //     Message: recorded.message,
        //     Success: recorded.success,
        //     AccessToken: token
        // });
    } catch (e) {
        res.status(500).send({
            result: e,
            message: 'Falha ao processar sua requisição!'
        });
    }
};

