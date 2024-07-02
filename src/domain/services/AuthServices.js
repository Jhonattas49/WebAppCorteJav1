/**
 * @filename AuthServices.js
 * @class AuthServices
 * @namespace 'src/domain/services'
 * @description **Serviços de autenticação.**
 * Este arquivo define serviços para auxiliar na autenticação de usuários. 
 * Ele provê funções para:
 *  * Gerar tokens JWT (JSON Web Token) para usuários autenticados.
 *  * Decodificar tokens JWT para extrair informações do usuário.
 *  * Comparar senhas fornecidas pelo usuário com senhas criptografadas armazenadas.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [27/06/2024]
 */
'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_KEY = process.env.SALT_KEY;
const stringComparison = require('../../shared/utils/StringComparison');

// Função para gerar o token
exports.generateToken = async (data) => {
    return jwt.sign(data, SALT_KEY, { expiresIn: '1d' });
}

// Função para decodificar o token
exports.decodeToken = async (token) => {
    try {
        return jwt.verify(token, SALT_KEY);
    } catch (error) {
        throw new Error('Token Inválido');
    }
}

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
};

// Função para comparar uma senha encriptada com uma senha fornecida
exports.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password + SALT_KEY, hash);
}
