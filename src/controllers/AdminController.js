'use strict';
const repository = require('../domain/repositories/AdminRepository');
const { validationResult } = require('express-validator');
const roles = require('../shared/enums/Roles');
const autheService = require('../domain/services/AuthServices');
const venomBotController = require('./VenomBotController');

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
            email: customer.email,
            name: customer.name,
            roles: customer.roles,
            mobilePhone: customer.mobilePhone
        });

        // Chamar o método StartBot do BotController

        if(!customer.roles.includes(roles.customer))
        {
            await venomBotController.StartBot(token, res, next);
            return;
        }


        res.status(200).send(token);
    } catch (e) {
        res.status(500).send({
            result: e,
            message: 'Falha ao processar sua requisição!'
        });
    }
};