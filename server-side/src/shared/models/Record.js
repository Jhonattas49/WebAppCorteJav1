/**
 * @filename Recorded.js
 * @class Recorded (corrigido para Record)
 * @namespace 'src/shared/models'
 * @description Define o modelo de dados para um registro no sistema
 *
 * A classe Record define o modelo de dados para um registro genérico no sistema.
 * Ela representa a estrutura de um documento no banco de dados MongoDB e pode ser 
 * utilizada para armazenar diferentes tipos de informações, dependendo das 
 * necessidades da aplicação.
 *
 * @author [GERSON ALVES DA SILVA]
 * @since [30/06/2024]
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contacts = require('../enums/ContactEnums').ContactEnum;

const RecordSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, index: true, unique: true },
    contacts: [{
        number: { type: String, required: true },
        isWhatsApp: { type: Boolean, required: true, default: true },
        isActive: { type: Boolean, required: true, default: true }
    }],
    role: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }],
    createDate: { type: Date, required: true, default: Date.now },
    isActive: { type: Boolean, required: true, default: true },
});


module.exports = mongoose.model('Record', RecordSchema);
