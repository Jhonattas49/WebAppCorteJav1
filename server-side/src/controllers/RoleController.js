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
const  rolesEnum= require('../shared/public/Permission').Roles;
const repository = require('../domain/repositories/RoleRepository');

exports.get = async (req, res, next) => {
    try {
        //const rolesList = 
        const result = await repository.get();

        return res.status(200).json({
            Message: "Data success",
            Success: true,
            Data: {roles: result}
        });
        
        // res.status(200).send({
        //     roles: rolesList
        // });
    } catch (e) {
        res.status(500).send({
            result: e,
            message: 'Falha ao processar sua requisição!'
        });
    }
}

exports.put = async (req, res, next) => {
    try {
        console.log('Put...');

        const roleId = req.body._id; // Assumindo que o ID do documento está presente no body
        const updatedData = {
            name: req.body.Name,
            permissions: req.body.Permissions,
            isActive: req.body.IsActive
        };

        // Chama o método update do repositório
        const updatedRole = await repository.update(roleId, updatedData);

        if (!updatedRole) {
            res.status(404).send({
                result: e,
                message: 'Role não encontrado.'
            });
        }

        console.log(updatedRole)
        return res.status(200).json({
            Message: "Permissões atualizadas com sucesso.",
            Success: true,
            Data: updatedRole
        });
    } catch (e) {
        return res.status(500).json({ message: 'Erro ao atualizar a Role.', error: e.message });
    }
};

exports.post = async (req, res, next) => {
    try {
        const newRoleData = {
            name: req.body.Name,
            permissions: req.body.Permissions,
        };

        // Chama o método create do repositório para criar um novo role
        const createdRole = await repository.create(newRoleData);

        if (!createdRole) {
            return res.status(400).send({
                message: 'Erro ao criar o novo role.'
            });
        }

       
        return res.status(201).json({
            Message: "Role criado com sucesso.",
            Success: true,
            Data: createdRole
        });
    } catch (e) {
        return res.status(500).json({ message: 'Erro ao criar o Role.', error: e.message });
    }
};

exports.delete = async (req, res, next) => {
    try {
        // Primeiro tenta extrair o roleId dos parâmetros da URL
        const roleId = req.params.id || req.body.roleId;

        // Verifica se o roleId foi fornecido
        if (!roleId) {
            return res.status(400).json({
                message: 'Role ID não fornecido.'
            });
        }

        console.log('Controller Gerson:', roleId);

        // Chama o método delete do repositório para remover o Role
        const deletedRole = await repository.delete(roleId);

        if (!deletedRole) {
            return res.status(404).json({
                message: 'Role não encontrado.'
            });
        }

        return res.status(200).json({
            Message: "Role deletado com sucesso.",
            Success: true,
            Data: deletedRole
        });
    } catch (e) {
        return res.status(500).json({ message: 'Erro ao deletar o Role.', error: e.message });
    }
};



