/**
 * @filename CustomerValidator.js 
 * @class CustomerValidator
 * @namespace 'src/shared/validators' 
 * @description **Define um conjunto de regras de validação**
 * A classe CustomerValidator define um conjunto de regras de validação para dados de cliente. 
 * Ela fornece uma função utilitária para criar um array de validações do Express Validator 
 * que podem ser usadas para validar a entrada do usuário em um formulário de cadastro de cliente.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [27/06/2024]
 */
'use strict';

const { body } = require('express-validator');
const path = require('path');

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
