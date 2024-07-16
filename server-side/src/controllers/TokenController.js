/**
 * @filename TokenController.js
 * @class TokenController
 * @namespace 'src/controllers'
 * @description **Controlador para gerenciamento de tokens de acesso.**
 * Este arquivo define a lógica para gerar um token JWT com base nos dados do usuário recebidos.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [15/07/2024]
 */
'use strict';

const tokenServices = require('../domain/services/TokenManager');
const { TokenResponse } = require('../application/jsonResponse');

exports.post = async (req, res, next) => {
    const user = req.body.user;
    try {
        if (!user) {
            return res.status(400).json({
                Message: "Usuário não fornecido",
                Success: false,
                Token: null,
                Data: null,
            });
        }

        const token = await tokenServices.generateToken(user);
        const data = await tokenServices.decodeToken(token);

        // Retornar um objeto JSON com o token e os dados decodificados
        return res.status(200).json({
            Message: "Login realizado com sucesso",
            Success: true,
            Token: token,
            Data: data
        });
    } catch (e) {
        console.error('Erro ao gerar token:', e);
        return res.status(500).json({
            Message: 'Falha ao processar sua requisição',
            Success: false,
            Token: null,
            Data: null
        });
    }
};

exports.get = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (!token) {
            return res.status(401).json({
                Message: null,
                Success: false,
                Data: null
            });
        }

        const { decoded, statusCode } = await tokenServices.decodeToken(token);

        res.status(statusCode).json({
            Message: statusCode === 200 ? 'Token válido' : 'Token Inválido',
            Success: statusCode === 200,
            Data: decoded
        });
    } catch (e) {
        console.error('Erro ao obter dados do usuário:', e.message);
        res.status(500).json({
            Message: e.message,
            Success: false,
            Data: null
        });
    }
};



