/**
 * @filename UsersRootDto.js
 * @class UsersRootDto 
 * @namespace 'src/domain/DTOs'
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
const {Recorded} = require('../../shared/models/Recorded');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
'use strict';

const UserSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true},
    role: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true}],
    isActive: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model('UsersRootDto', UsersRootDtoSchema);

//Precisa ajustar
