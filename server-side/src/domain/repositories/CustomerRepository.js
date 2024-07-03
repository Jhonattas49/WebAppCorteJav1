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
const Customer = mongoose.model('Customer'); 
const comparePassword= require('../services/AuthServices');

exports.get = async () =>{
    const result= await Customer.find({});
    return result;
};

exports.create = async (data) =>{
    var customer = new Customer(data);    
    return await customer.save();
};

exports.update = (id, data) =>{
    return Customer
        .findByIdAndUpdate(id,{
        $set: {
                name: data.name,
                email: data.email,
                mobilePhone: data.mobilePhone,
                roles: data.roles,
        } 
        },{new: true});
};

exports.authenticate = async (data) => {
    const customer = await Customer.findOne({email : data.email});
    const result = comparePassword.comparePassword(data.password,customer.password)?customer:false;
    return result;
};