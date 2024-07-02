/**
 * @filename Role.js 
 * @class Role
 * @namespace 'src/shared/models' 
 * @description **define o modelo de dados para um cliente no sistema**
 * A classe Customer define o modelo de dados para um cliente no sistema. 
 * Ela representa a estrutura de um documento "cliente" no banco de dados MongoDB.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [30/06/2024]
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Permission } = require('../public/Permission');

const roleSchema = new Schema({
    name: { type: String, required: true, trim: true },
    permissions: [{ type: String, String: Object.values(Permission) }], // Array de strings com enum para validação
    createDate: { type: Date, required: true, default: Date.now },
    isActive: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model('Role', roleSchema);
