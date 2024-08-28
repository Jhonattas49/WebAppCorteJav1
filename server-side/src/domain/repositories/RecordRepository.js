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
const Record = mongoose.model('Record'); 

exports.get = async () =>{
    const result= await Record.find({});
    return result;
};

exports.getByEmail = async (email) =>{
    const result= await Record.findOne({ email: email });
    return result;
};


exports.create = async (data) => {
    const record = new Record(data);
    return await record.save();
};

//Precisa ajustar
exports.update = (id, data) =>{
    return Record
        .findByIdAndUpdate(id,{
        $set: {
                name: data.name,
                email: data.email,
        } 
        },{new: true});
};
