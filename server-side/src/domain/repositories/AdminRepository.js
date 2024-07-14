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

const User = mongoose.model('User');
const comparePassword = require('../services/AuthServices');
const Recorded = mongoose.model('Recorded');


exports.get = async () => {
    const result = await Customer.find({});
    return result;
};

exports.create = (data) => {
    var customer = new Customer(data);
    return customer.save();
};

exports.authenticate = async (data) => {
    try {
        // Procurar no modelo Recorded pelo email
        const recorded = await Recorded.findOne({ email: data.email });
        if (!recorded) {
            return { success: false, message: 'Registro não encontrado!' };
        }
        // Procurar usuário associado ao recorded
        const user = await User.findOne({ recorded: recorded.id });

        if (!user || !user.isActive) {
            return { success: false, message: 'Usuário não encontrado!' };
        }
   
        // Verificar se a lista de senhas não está vazia
        if (!user.password || user.password.length === 0) {
            return { success: false, message: 'Nenhuma senha cadastrada para o usuário!' };
        }      

        // Obter a última senha da lista de senhas
        const latestPassword = user.password[user.password.length - 1];

        // Comparar senha utilizando a última senha cadastrada
        const passwordMatch = comparePassword.comparePassword(data.password, latestPassword);
        if (!passwordMatch) {
            return { success: false, message: 'Senha incorreta!' };
        }

        // Retornar usuário autenticado
        return { success: true, message: 'Login realizado com sucesso.', recorded: recorded };
    } catch (error) {
        console.error('Erro na autenticação:', error);
        return { success: false, message: 'Erro ao autenticar usuário!' };
    }
};


