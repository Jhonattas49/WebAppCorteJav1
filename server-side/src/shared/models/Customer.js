/**
 * @filename Customer.js 
 * @class Customer
 * @namespace 'src/shared/models' 
 * @description **define o modelo de dados para um cliente no sistema**
 * A classe Customer define o modelo de dados para um cliente no sistema. 
 * Ela representa a estrutura de um documento "cliente" no banco de dados MongoDB.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [26/06/2024]
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CustomerSchema = new Schema({
    identity:{ type: String, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true},
    mobilePhone: {type: String, required: true},
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true},
    isActive: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model('Customer', CustomerSchema);