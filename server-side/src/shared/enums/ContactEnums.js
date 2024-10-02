/**
 * @filename ContactEnum.js
 * @class ContactEnum
 * @namespace 'src/enums'
 * @description **Enumeração para gerenciamento de contatos.**
 * Esta classe define propriedades para gerenciar contatos na aplicação.
 * Ela inclui informações sobre o número de telefone, se é um número de WhatsApp,
 * e se está ativo ou não.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [30/06/2024]
 */
'use strict';

exports.ContactEnum = {
    number: {
        type: String,
        required: true
    },
    isWhatsApp: {
        type: Boolean,
        required: true,
        default: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
};
