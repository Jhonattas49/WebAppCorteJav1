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
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Carregar variáveis de ambiente
const SALT_KEY = process.env.SALT_KEY;

if (!SALT_KEY) {
    throw new Error('SALT_KEY não definida no arquivo .env');
}

// // Função para gerar o token
// exports.generateToken = async (data) => {
//     const newData = {
//         RecordID: data.recorded._id,
//         Name: data.recorded.name,
//         Contacts: data.recorded.contacts,
//         Roles: data.recorded.role        
//     }
//     console.log('Valor no parametro de entrada:', data);
//     console.log('Gerando token com dados:', newData);
//     const token = jwt.sign(newData, SALT_KEY, { expiresIn: '1d' });
//     console.log('Token gerado:', token);
//     return token;
// }

// // Função para decodificar o token
// exports.decodeToken = async (token) => {
//     try {
//         console.log('Decodificando token:', token);
//         const decoded = await jwt.verify(token, SALT_KEY);
//         return decoded;
//     } catch (error) {
//         console.error('Erro ao decodificar token:', error.message);
//         throw new Error('Token Inválido');
//     }
// }

// Função para autorizar
exports.authorize = function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

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
