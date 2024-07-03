/**
 * @filename _index.js
 * @namespace 'src/shared/models'
 * @description Este arquivo carrega todos os modelos Mongoose utilizados na aplicação.
 *
 * @author [GERSON ALVES DA SILVA]
 * @since [30/06/2024]
 */
'use strict';


//Arquivo para cerregar as modelos
module.exports = {
    Recorded: require('./Recorded'),
    User: require('./User'),
    Role: require('./Role'),
    Customer: require('./Customer')
};

