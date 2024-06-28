const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_KEY = process.env.SALT_KEY;

//Função para gerar o token
exports.generateToken = async (data) => {
    return jwt.sign(data, SALT_KEY, { expiresIn: '1d' });
}

// Função para comparar uma senha encriptada com uma senha fornecida
exports.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password + SALT_KEY, hash);
}
