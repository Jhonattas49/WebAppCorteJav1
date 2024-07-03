/**
 * @filename PassWordEnum.js
 * @class PassWordEnum
 * @namespace 'src/enums'
 * @description Enumeração para gerenciamento de senhas.
 * Esta classe define propriedades para gerenciar senhas na aplicação.
 * Ela inclui informações sobre a senha e se está ativa ou não.
 * 
 * @author GERSON ALVES DA SILVA
 * @since 30/06/2024
 */
'use strict';

exports.PassWordEnum = {
    password: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    }
};
