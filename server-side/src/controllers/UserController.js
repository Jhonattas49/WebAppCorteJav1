/**
 * @filename RecordController.js
 * @class RecordController
 * @namespace 'src/controllers'
 * @description **Controlador para gerenciamento de clientes.**
 * Esta classe define rotas para gerenciar clientes na aplicação. 
 * Ela interage com o repositório `CustomerRepository` para acessar dados de clientes 
 * e utiliza o `express-validator` para validar entradas de usuários.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [27/06/2024]
 */
'use strict';

const repository = require('../domain/repositories/UserRepository');

const bcrypt = require('bcrypt');
require('dotenv').config();
const SALT_KEY = process.env.SALT_KEY;


exports.get = async (req, res, next) => {
    try {
        console.log("Rota de registro")
        //var data = await repository.get();
        res.status(200).send("Rota para registro");
    } catch (e) {
        res.status(500).send({
            result: e,
            message: 'Falha ao processar sua requisição!'
        });
    }
}

exports.post = async (req, res, next) => {
    try{
        const hashedPassword = await bcrypt.hash(req.RecordPassword + SALT_KEY, 10);
      
        const user = {
            record: req.RecordId,
            password: [hashedPassword],      
        };

        // Chama o método create do repositório para criar um novo role
        const result = await repository.create(user);

        return res.status(201).json({
            Message: "Registro realizado com sucesso!",
            Success: true,
            Data: {
                Email: req.RecordEmail,
                Password : req.RecordPassword,
            }
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao precessar sua requisição'
        });
    }
}

exports.put = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Cliente alterado com sucesso' });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao precessar sua requisição'
        });
    }
};
