/**
 * @filename AdminRepository.js
 * @class AdminRepository
 * @namespace 'src/domain/repositories'
 * @description Esta classe é responsável por gerenciar operações relacionadas 
 * ao modelo Customer no banco de dados MongoDB, utilizando o Mongoose. 
 * Oferece métodos para criar novos registros e recuperar dos cliente.
 * @author [GERSON ALVES DA SILVA]
 * @since [27/06/2024]
 */
'use strict';

const mongoose = require('mongoose');
const Role = mongoose.model('Role'); 

exports.get = async () =>{
    const result= await Role.find({});
    return result;
};

exports.create = async (data) => {
    // Cria uma nova instância de Role com os dados fornecidos
    const role = new Role(data);
    
    // Salva o novo Role no banco de dados e retorna o resultado
    return await role.save();
};

exports.update = (id, data) => {
    return Role.findByIdAndUpdate(
        id,
        {
            $set: {
                name: data.name,
                permissions: data.permissions,
                isActive: data.isActive,
                color: data.color
            }
        },
        { new: true }
    );
};

exports.delete = async (roleId) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(roleId);

        if (!deletedRole) {
            throw new Error('Role not found');
        }

        return deletedRole;
    } catch (err) {
        throw new Error(`Error deleting role: ${err.message}`);
    }
};