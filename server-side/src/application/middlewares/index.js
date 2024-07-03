const mongoose = require('mongoose');

const { create, getByEmail } = require('../../domain/repositories/RecordedRepository');
const Recorded = mongoose.model('Recorded');

const  createRole  = require('../../domain/repositories/RoleRepository').create;
const Role = mongoose.model('Role');

const createUser  = require('../../domain/repositories/UserRepository').create;
const User = mongoose.model('User');

const { Permission } = require('../../shared/public/Permission');

const CreateSupUser = async (req, res, next) => {
    if (!(await getByEmail('root@root'))) {
        const roles = await roleCreate();
        if (roles) {
            const record = await recordCreate(roles);
            if (record) {
                const user = await UserCreate(record);
                if (user) {
                    next();
                }
            }
        }
    }
    next();
};

async function recordCreate(roles) {
    const record = new Recorded({
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
    return await create(record);
}

async function roleCreate() {

    // Cria um array de permissões a partir do objeto Permission
    var perm = [];
    Object.keys(Permission).forEach(key => {
        perm.push(key.toString());
    });

    // Cria um novo documento Role
    const role = new Role({
        name: 'SuperAdmin',
        permissions: perm, // Passar o array diretamente
        isActive: true
    });
    return await createRole(role);
};

async function UserCreate(record) {
    const userData = new User({
        Recorded: record._id,
        password: '!!Son2024',
        isActive: true
    });
    return await createUser(userData);
}

module.exports = {
    CreateSupUser,
};