// src/ddd/customer/validators/customerValidator.js
const { body } = require('express-validator');
const path = require('path');

const roles = require('../enums/Roles');

const customerValidationRules = () => {
    return [
        body('name').notEmpty().withMessage('Nome é obrigatório').trim().escape(),
        body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
        body('mobilePhone').isMobilePhone('pt-BR').withMessage('Número de telefone inválido'), // Certifique-se que o locale esteja correto e suportado
        body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),       
    ];
};

module.exports = {
    customerValidationRules,
};
