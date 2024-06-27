'use strict';
const repository = require('../domain/repositories/CustomerRepository');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
require('dotenv').config();
const SALT_KEY = process.env.SALT_KEY;

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

    try {
        // await repository.create({
        //     Name: req.body.name,
        //     Elementmail: req.body.email,
        //     Password: md5(req.body.password + global.SALT_KEY)
        //   });
        res.status(201).send({ message: hashedPassword });
    } catch (e) {
        res.status(500).send({
            result: e,
            message: 'Falha ao processar sua requisição!'
        });
    }
}