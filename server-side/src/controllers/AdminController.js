/**
 * @filename AdminController.js
 * @class AdminController
 * @namespace 'src/controllers'
 * @description **Controlador para gerenciamento de administradores.**
 * Esta classe define rotas para gerenciar administradores na aplicação. 
 * Ela utiliza o repositório `AdminRepository` para acessar dados de administradores 
 * e valida entradas de usuário com o `express-validator`.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [28/06/2024]
 */
'use strict';

const repository = require('../domain/repositories/AdminRepository');

exports.get = async (req, res, next) => {
    try {
        console.log('Pagina index carregada.')
        res.status(200).send(res);
    } catch (e) {
        res.status(500).send({
            result: e,
            message: 'Falha ao processar sua requisição!'
        });
    }
}
//     try {
//         const customer = await repository.authenticate({
//             email: req.body.email,
//             password: req.body.password
//         });

            
//         if (!customer) {
//             res.status(404).send({
//                 message: "Usuário ou senha inválido!"
//             });
//             return;
//         }
//         return;
//         const token = await autheService.generateToken({
//             id: customer._id,
//             identity: customer.identity,
//             email: customer.email,
//             name: customer.name,
//             roles: customer.roles,
//             mobilePhone: customer.mobilePhone
//         });

//         res.status(200).send(token);
//     } catch (e) {
//         res.status(500).send({
//             result: e,
//             message: 'Falha ao processar sua requisição!'
//         });
//     }
// };


