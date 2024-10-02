/**
 * @filename FindKeyByValue.js 
 * @class FindKeyByValue
 * @namespace 'src/shared/utils' 
 * @description **Função utilitária para encontrar a chave**
 * A classe FindKeyByValue fornece uma função utilitária para 
 * encontrar a chave associada a um valor específico em um objeto. 
 * Esta classe é particularmente útil para trabalhar com enumerações, 
 * onde os valores são conhecidos, mas as chaves correspondentes precisam ser recuperadas
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [27/06/2024]
 */
'use strict';

const roles = require('../enums/Roles');

exports.getKey = (value) =>{
    return Object.keys(roles).find(key => roles[key] === value);
}