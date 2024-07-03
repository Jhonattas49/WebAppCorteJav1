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
const Recorded = mongoose.model('Recorded'); 

exports.get = async () =>{
    const result= await Recorded.find({});
    return result;
};

exports.getByEmail = async (email) =>{
    const result= await Recorded.findOne({ email: email });
    return result;
};

exports.create = async (data) =>{
    var recorded = new Recorded (data);    
    return await recorded.save();
};

//Precisa ajustar
exports.update = (id, data) =>{
    return Recorded
        .findByIdAndUpdate(id,{
        $set: {
                name: data.name,
                email: data.email,
        } 
        },{new: true});
};

exports.authenticate = async (data) => {
    const customer = await Customer.findOne({email : data.email});
    const result = comparePassword.comparePassword(data.password,customer.password)?customer:false;
    return result;
};