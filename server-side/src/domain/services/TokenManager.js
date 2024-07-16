/**
 * @filename TokenManager.js
 * @class TokenManager
 * @namespace 'src/domain/services' 
 * @description **Gerenciamento de tokens de acesso.**
 * Este arquivo define um gerenciador de tokens de acesso para aplicações web. 
 * Ele provê funções para:
 *  * Gerar tokens de acesso JWT.
 *  * Decodificar tokens JWT.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [27/06/2024]
 */
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Carregar variáveis de ambiente
const SALT_KEY = process.env.SALT_KEY;
'use strict';

if (!SALT_KEY) {
    throw new Error('SALT_KEY não definida no arquivo .env');
}

// Função para gerar o token JWT
exports.generateToken = async (user) => {
    const newData = {
        RecordID: user.data._id,
        Name: user.data.name,
        Email: user.data.email,
        Contacts: user.data.contacts,
        Roles: user.data.role        
    };
    const token = jwt.sign(newData, SALT_KEY, { expiresIn: '1d' });
    return token;
};

// Função para decodificar o token JWT e verificar expiração
exports.decodeToken = async (token) => {
    try {
        const decoded = await jwt.verify(token, SALT_KEY) || false;

        if (!decoded) {
            return { message: "Não à uma sessão com este usuário!", statusCode: 401 };
        }

        if (decoded.exp <= Math.floor(Date.now() / 1000)) {
            throw new Error('Sessão expirada. Por favor, faça login novamente.');
        }

        return { decoded, statusCode: 200 };
    } catch (error) {
        //console.error('Erro ao decodificar token:', error.message);
        throw new Error(error.message === 'Sessão expirada. Por favor, faça login novamente.' ? 'Sessão expirada. Por favor, faça login novamente.' : 'Sessão inválida. Por favor, faça login novamente.');
    }
};


