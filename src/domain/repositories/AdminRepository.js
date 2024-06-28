/**
 * @filename AdminRepository.js
 * @class AdminRepository
 * @namespace 'src/domain/repositories'
 * @description Esta classe é responsável por gerenciar operações relacionadas 
 * ao modelo Customer no banco de dados MongoDB, utilizando o Mongoose. 
 * Oferece métodos para criar novos registros e recuperar dos admin.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [27/06/2024]
 */
'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer'); 

exports.get = async () =>{
    const result= await Customer.find({});
    return result;
};

exports.create = (data) =>{
    var customer = new Customer(data);    
    return customer.save();
};

