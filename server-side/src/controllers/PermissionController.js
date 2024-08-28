/**
 * @filename RoleController.js
 * @class RoleController
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
const  permissionsEnum= require('../shared/public/Permission').Permission;

exports.get = async (req, res, next) => {
    try {
        // Cria lista de permissões
        const permissionsList = Object.keys(permissionsEnum).map(key => {
            return { Name: key, Description: permissionsEnum[key] };
        });

        return res.status(200).json({
            Message: "Data success",
            Success: true,
            Data: {permissions: permissionsList}
        });
        // res.status(200).send({
        //     permissions: permissionsList,
        // });
    } catch (e) {
        res.status(500).send({
            result: e,
            message: 'Falha ao processar sua requisição!'
        });
    }
}

