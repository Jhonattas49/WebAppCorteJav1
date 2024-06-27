'use strict';
const repository = require('../domain/repositories/CustomerRepository');
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
require('dotenv').config();
const SALT_KEY = process.env.SALT_KEY;
const roles = require('../shared/enums/Roles');


exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            result: e,
            message: 'Falha ao processar sua requisição!'
        });
    }
}

exports.post = async (req, res, next) => {
    // Verifica se há erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    // Encripta a senha antes de salvar, adicionando o SALT_KEY
    const hashedPassword = await bcrypt.hash(req.body.password + SALT_KEY , 10);
    const findKeyBy = require('../shared/utils/FindKeyByValue').getKey(roles.customer);
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            mobilePhone: req.body.mobilePhone,
            roles: findKeyBy,
            password: hashedPassword
          });
        res.status(201).send({ message: 'Cliente cadastrado com sucesso!' });
    } catch (e) {
        res.status(500).send({
            result: e,
            message: 'Falha ao processar sua requisição!'
        });
    }
}