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
    try {
        const recorded = await repository.authenticate({
            email: req.body.email,
            password: req.body.password
        });

        if (!recorded.success) {
            res.status(404).send({
                message: recorded.message
            });
            return;
        }

        const token = await tokenServices.generateToken(recorded);

        res.status(200).send({
            Message: recorded.message,
            Success: recorded.success,
            AccessToken: token
        });
    } catch (e) {
        res.status(500).send({
            result: e,
            message: 'Falha ao processar sua requisição!'
        });
    }
};

exports.getDataUser = async (req, res, next) => {
    console.log('Api alcançada no c#')
    try {
        // Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        // Decodifica o token de forma assíncrona
        const data = await tokenServices.decodeToken(token);

        res.status(200).send(data);
    } catch (e) {
        console.error('Erro ao obter dados do usuário:', e.message);
        res.status(401).json({ message: 'Token Inválido' });
    }
};