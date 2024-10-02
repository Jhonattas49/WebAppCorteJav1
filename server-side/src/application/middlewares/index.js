const mongoose = require('mongoose');
const { create, getByEmail } = require('../../domain/repositories/RecordRepository');
const Record = mongoose.model('Record');
const createRole = require('../../domain/repositories/RoleRepository').create;
const Role = mongoose.model('Role');
const createUser = require('../../domain/repositories/UserRepository').create;
const User = mongoose.model('User');
const { Permission } = require('../../shared/public/Permission');

const CreateSupUser = async (req, res, next) => {
    try {
        console.log('Verificando se o registro root@root já existe');
        
        let roles = await Role.findOne({ name: 'SuperAdmin' });
        if (!roles) {
            roles = await roleCreate();
            if (!roles) {
                console.log('Falha ao criar roles');
                return next();
            }
            console.log('Roles criadas com sucesso');
        }

        let record = await Record.findOne({ email: 'root@root' });
        if (!record) {
            record = await recordCreate(roles);  
            if (!record) {
                console.log('Falha ao criar o registro');
                return next();
            } 
            console.log('Registro criado com sucesso!');
        }

        let user = await User.findOne({ record: record._id });
        if (!user) {
            user = await UserCreate(record);
            if (!user) {
                console.log('Falha ao criar usuário');
                return next();            
            } 
            console.log('Usuário criado com sucesso');
        }

        return next();
    } catch (error) {
        console.error('Erro ao criar usuário super administrador:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

async function recordCreate(roles) {
    const record = new Record({
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
    await record.save();
    return record;
}

async function roleCreate() {
    const perm = Object.keys(Permission).map(key => key.toString());

    const role = new Role({
        name: 'SuperAdmin',
        permissions: perm,
        isActive: true
    });
    await role.save();
    return role;
}

async function UserCreate(record) {
    const SALT_KEY = process.env.SALT_KEY;
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash('!!Son2024' + SALT_KEY, 10);

    const userData = new User({
        record: record._id,
        password: [hashedPassword],
        isActive: true
    });
    await userData.save();
    return userData;
}

module.exports = {
    CreateSupUser,
};
