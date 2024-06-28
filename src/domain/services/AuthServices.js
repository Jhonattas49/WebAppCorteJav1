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

//Função para gerar o token
exports.generateToken = async (data) => {
    return jwt.sign(data, SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    var data= await jwt.verify(token, SALT_KEY);
    return data;
}

// Função para comparar uma senha encriptada com uma senha fornecida
exports.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password + SALT_KEY, hash);
}
