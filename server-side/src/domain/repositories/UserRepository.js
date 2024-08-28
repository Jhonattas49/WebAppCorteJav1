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
const User = mongoose.model('User'); 

exports.get = async () =>{
    const result= await User.find({});
    return result;
};

exports.create = async (data) => {
    const user = new User(data);
    return await user.save();
};

exports.update = (id, data) =>{
    return User
        .findByIdAndUpdate(id,{
        $set: {
                name: data.name,
                email: data.email,
                mobilePhone: data.mobilePhone,
                roles: data.roles,
        } 
        },{new: true});
};

