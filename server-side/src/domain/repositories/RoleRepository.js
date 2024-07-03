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

exports.create = async (data) =>{
    var role = new Role(data);    
    return await role.save();
};

exports.update = (id, data) =>{
    return Role
        .findByIdAndUpdate(id,{
        $set: {
                name: data.name,
                email: data.email,
                mobilePhone: data.mobilePhone,
                roles: data.roles,
        } 
        },{new: true});
};
