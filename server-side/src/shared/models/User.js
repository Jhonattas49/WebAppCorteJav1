/**
 * @filename User.js
 * @class User
 * @namespace 'src/shared/models'
 * @description **Define o modelo de dados para um usuário no sistema.**
 *
 * A classe User define o modelo de dados para um usuário no sistema.
 * Ela representa a estrutura de um documento no banco de dados MongoDB e pode ser 
 * utilizada para armazenar informações de usuários, como registros associados,
 * senha, função e status de atividade.
 *
 * @autor [GERSON ALVES DA SILVA]
 * @since [30/06/2024]
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    record: { type: mongoose.Schema.Types.ObjectId, ref: 'Record', required: true },
    password: [{ type: String, required: true }],
    isActive: { type: Boolean, required: true, default: true },
});


module.exports = mongoose.model('User', UserSchema);
