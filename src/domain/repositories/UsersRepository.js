/**
 * @filename AdminRepository.js
 * @class AdminRepository
 * @namespace 'src/domain/repositories'
 * @description Esta classe é responsável por gerenciar operações relacionadas 
 * ao modelo Customer no banco de dados MongoDB, utilizando o Mongoose. 
 * Oferece métodos para criar novos registros e recuperar dos admin.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [30/06/2024]
 */
'use strict';

const mongoose = require('mongoose');
const Recorded = mongoose.model('Recorded');
const User = mongoose.model('User');
const Role = mongoose.model('Role');
const { Permission } = require('../../shared/public/Permission');
const contact = require('../../shared/enums/ContactEnums').ContactEnum;

async function Record(roles) {
    // Cria um novo registro
    const recordedData = new Recorded({
        name: 'Root',
        email: 'root@root',
        contacts: [{
            number: '123456789',
            isWhatsApp: false,
            isActive: true
        }],
        role: roles._id,
        isActive: true
    });
    return await recordedData.save();
}

async function createRole() {
    try {
        // Cria um array de permissões a partir do objeto Permission
        var perm = [];
        Object.keys(Permission).forEach(key => {
            perm.push(key.toString());
        });

        // Cria um novo documento Role
        const roleData = new Role({
            name: 'SuperAdmin',
            permissions: perm, // Passar o array diretamente
            isActive: true
        });

        // Salva o novo documento Role no banco de dados
        return await roleData.save();
    } catch (error) {
        console.error('Erro ao criar o Role:', error);
    }
}

exports.createSupUser = async () => {
    try {
        // Verifica se já existe um usuário root
        const rootUser = await User.findOne({ email: 'root@root' }).populate('Recorded');
        if (!rootUser) {
            var roles = await createRole();
            var record = await Record(roles);
            
            // Cria um novo usuário
            const userData = new User({
                Recorded: record._id,
                password: '!!Son2024',  // Você deve usar bcrypt para hash da senha antes de salvar
                isActive: true
            });
            await userData.save();
        }
        console.log('Usuário Root criado com sucesso.');
    } catch (error) {
        console.error('Erro ao criar o usuário Root: ', error);
    }
};
