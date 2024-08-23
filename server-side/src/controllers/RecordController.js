/**
 * @filename RecordController.js
 * @class RecordController
 * @namespace 'src/controllers'
 * @description **Controlador para gerenciamento de clientes.**
 * Esta classe define rotas para gerenciar clientes na aplicação. 
 * Ela interage com o repositório `CustomerRepository` para acessar dados de clientes 
 * e utiliza o `express-validator` para validar entradas de usuários.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [27/06/2024]
 */
'use strict';

const repository = require('../domain/repositories/CustomerRepository');

const bcrypt = require('bcrypt');
require('dotenv').config();
const SALT_KEY = process.env.SALT_KEY;
const crypto = require('../shared/public/GenerateNumber');
const autheService = require('../domain/services/AuthServices');

exports.get = async (req, res, next) => {
    try {
        console.log("Rota de registro")
        //var data = await repository.get();
        res.status(200).send("Rota para registro");
    } catch (e) {
        res.status(500).send({
            result: e,
            message: 'Falha ao processar sua requisição!'
        });
    }
}

exports.post = async (req, res, next) => {
    // Verifica se há erros de validação
    //const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    // Encripta a senha antes de salvar, adicionando o SALT_KEY
    // const hashedPassword = await bcrypt.hash(req.body.password + SALT_KEY, 10);
    // const findKeyBy = require('../shared/utils/FindKeyByValue').getKey(roles.customer);
    // try {
    //     await repository.create({
    //         identity: crypto.generateRandomNumber(),
    //         name: req.body.name,
    //         email: req.body.email,
    //         mobilePhone: req.body.mobilePhone,
    //         roles: findKeyBy,
    //         password: hashedPassword
    //     });
    //     res.status(201).send({ message: 'Cliente cadastrado com sucesso!' });
    // } catch (e) {
    //     res.status(500).send({
    //         result: e,
    //         message: 'Falha ao processar sua requisição!'
    //     });
    // }
}

exports.put = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Cliente alterado com sucesso' });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao precessar sua requisição'
        });
    }
};

exports.login = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: req.body.password
        });
        if (!customer) {
            res.status(404).send({
                message: "Usuário ou senha inválido!"
            });
            return;
        }
        const token = await autheService.generateToken({
            id: customer._id,
            identity: customer.identity,
            email: customer.email,
            name: customer.name,
            roles: customer.roles,
            mobilePhone: customer.mobilePhone
        });

        res.status(200).send(token);
    } catch (e) {
        res.status(500).send({
            result: e,
            message: 'Falha ao processar sua requisição!'
        });
    }
};