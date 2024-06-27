// src/ddd/customer/validators/customerValidator.js
const { body } = require('express-validator');
const path = require('path');

const roles = require('../enums/Roles');

const customerValidationRules = () => {
    return [
        body('Name').notEmpty().withMessage('Nome é obrigatório').trim().escape(),
        body('Email').isEmail().withMessage('Email inválido').normalizeEmail(),
        body('Password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),       
    ];
};

module.exports = {
    customerValidationRules,
};
