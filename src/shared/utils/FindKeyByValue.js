const roles = require('../enums/Roles');

exports.getKey = (value) =>{
    return Object.keys(roles).find(key => roles[key] === value);
}